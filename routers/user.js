import express from "express";
import User from "../models/user.js";
const router = express.Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

router.get('/', async (req, res) => {
  const users = await User.find().select('-password');

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin,
    phone: req.body.phone,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    country: req.body.country,
    created_at: req.body.created_at,
  });

  res.status(201).json(createUser);
});

router.put('/:id', async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email
  }, { new: true });

  if (!updateUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(updateUser);
})

router.delete('/:id', async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id);

  if (!deleteUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(204).send();
})

router.post('/login', async (req, res) => {
  const secret = process.env.SECRET
  const user = await User.findOne({
    email: req.body.email.toLowerCase()
  });

  if(!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      { expiresIn: '2d' }
    );

    res.status(200).send({user: user.email, token: token});
  } else {
    return res.status(401).send("Invalid email or password");
  }
});

export default router;
