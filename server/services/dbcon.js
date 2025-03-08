// const URL = mongodb+srv://avadhoot:<db_password>@googlebooks.vytaf.mongodb.net/?retryWrites=true&w=majority&appName=googleBooks
import mongoose from "mongoose";


 const connectDB = async (url)=>{
try {
    await mongoose.connect(url);
    console.log("db connected");
} catch (error) {
    console.log(error)
}
}
export default connectDB;
