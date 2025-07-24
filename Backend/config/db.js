import mongoose from "mongoose";

const connectDb= async()=>{
    try {
        const connect =await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb connected')
    } catch (error) {
        console.log(error?.message || error?.data?.message)
    }
}

export default connectDb;