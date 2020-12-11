import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // Deletion of already existed records
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    // Insertion of new records
    // Inserting all the users
    const createdUsers = await User.insertMany(users)

    // Getting the Admin
    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      }
    })

    // Inserting the products
    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // Deletion of already existed records
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
