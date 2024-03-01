import mongoose from "mongoose";

const conectDb = async()=>{
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI)
        const conect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb conected: ${conect.connection.host}`);
    } catch (error) {
        console.error(`Error:${error.message}`)
        process.exit(1);
    }

}

export default conectDb