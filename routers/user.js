import express from "express";
import User from "../models/user.js";
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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


export default router;
