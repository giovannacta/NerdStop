import express from 'express';
import Order from '../models/order.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const orderList = await Order.find()
    res.status(200).json(orderList)
})

router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(order)
})

router.post('/', async (req, res) => {
    const order = await Order.create({
        order_id: req.body.order_id,
        user_id: req.body.user_id,
        total_price: req.body.total_price,
        status: req.body.status,
        created_at: req.body.created_at
    })
    res.status(201).json(order)
})

router.put('/:id', async (req, res) => {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
        total_price: req.body.total_price,
        status: req.body.status
    },
    { new: true })

    if (!updateOrder) {
        return res.status(404).json({ message: 'Order not found' })
    }
    res.status(200).json(updateOrder)
})

router.delete('/:id', async (req, res) => {
    const deleteOrder = await Order.findByIdAndDelete(req.params.id)
    res.status(204).send()
})

export default router;