import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();

router.get('/:user_id', async (req, res) => {
    const cart = await Cart.findOne({ user_id: req.params.user_id })
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' })
    }
    res.status(200).json(cart)
})

router.post('/', async (req, res) => {
    const exixtingCart = await Cart.findOne({ cart_id: req.body.cart_id })
    if (exixtingCart) {
        return res.status(400).json({ message: 'Cart already exists' })
    }

    const createCart = await Cart.create({
        user_id: req.body.user_id,
    })
    console.log("Cart created", createCart)
    if (!createCart) {
        return res.status(404).json({ message: 'Cart not found' })
    }
    res.status(201).json(createCart)
})

router.delete('/:id', async (req, res) => {
    const deleteCart = await Cart.findByIdAndDelete(req.params.cart_id)
    if (!deleteCart) {
        return res.status(404).json({ message: 'Cart not found' })
    }
    res.status(204).send()
})


export default router;