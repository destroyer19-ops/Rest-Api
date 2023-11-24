import express from 'express'
import User from '../model/user.js'
const router = express.Router()

// All routes in here start with /users
router.get('/', async (req, res) => {
    const userList = await User.find()

    if(!userList){
        res.status(500).json({success: false})
    }
    res.send(userList)
})
export default router