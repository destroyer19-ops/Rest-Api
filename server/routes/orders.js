import express from 'express'
import Order from '../model/order.js'
const router = express.Router()

// All routes in here start with /users
router.get('/', async (req, res) => {
    const orderList = await Order.find()

    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList)
})
export default router