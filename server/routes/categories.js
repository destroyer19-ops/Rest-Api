import express from 'express'
import Category from '../model/category.js'
const router = express.Router()

// All routes in here start with /category
// Get category list
router.get('/', async (req, res) => {
    const categoryList = await Category.find()

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList)
})

// Get single category
router.get('/:id', async (req,res)=>{
    try {
        const category = await Category.findById(req.params.id)

        if(!category){
           return res.status(404).json({message: 'The category with the given ID was not found'})
        }
        res.status(200).send(category)
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

// add category
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save()

    if (!category)
        return res.status(404).send('the category cannot be created')

    res.send(category)
})

// api/v1/:id
// Delete Category
router.delete('/:categoryId', async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ _id: req.params.categoryId })
        if (deletedCategory) {
            res.status(200).json({ success: true, message: 'the category is deleted!' })
        } else {
            res.status(404).json({
                success: false,
                message: "category not found"
            })
        }
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
   
})

// Update category
router.put('/:id', async(req, res)=>{
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            }, {new: true}
        )
        if(!category) {
           return res.status(400).send('the category cannot be created')
        }
        res.send(category)
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})
export default router