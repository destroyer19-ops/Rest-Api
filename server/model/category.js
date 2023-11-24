import mongoose from "mongoose";


const categorySchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Category = mongoose.model('Category', categorySchema)

export default Category;

