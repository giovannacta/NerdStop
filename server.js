import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('Error connecting to MongoDB', err));


const userSchema = new mongoose.Schema({
    name: String, required: true,
    email: String, required: true, unique: true,
    password: String, required: true
});

const User = mongoose.model('User', userSchema);

app.get('/', async (req, res) => {

    const users = await User.find()

    res.status(200).json(users)
})

app.post('/user', async (req, res) => {

    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })


    res.status(201).json(user)
})

app.listen(3000)