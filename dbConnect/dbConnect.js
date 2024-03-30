import mongoose from "mongoose";

const url = "mongodb://localhost:27017/shop"
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(url, {
           
        })
        console.log("Connected")
    } catch (error) {
        console.log(error);
        console.log("Error");
    }
};

export default dbConnect
