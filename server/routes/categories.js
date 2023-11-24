import express from 'express'
import Categories from '../model/category.js'
const router = express.Router()

// All routes in here start with /users
router.get('/', async (req, res) => {
    const categoryList = await Categories.find()

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
})
export default router