import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import mongoose, { mongo } from 'mongoose'
import productsRouter from './routes/product.js'
import categoriesRoutes from './routes/categories.js'
import usersRoutes from './routes/UserRoutes.js'
import orderRoutes from './routes/orders.js'

const app = express();

const PORT = process.env.PORT || 5000;
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())

// middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/categories`, categoriesRoutes)
app.use(`${api}/users`, usersRoutes)
app.use(`${api}/orders`, orderRoutes)

// connecting to mongodb
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=> {
    console.log('Databse is connected successfully ...');
})
.catch((err)=>{
    console.log(err);
})

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`)
    console.log(api);
})