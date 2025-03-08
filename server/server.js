
import express from "express";
import authRoutes from "./routes/login.js";
import registerRoute from "./routes/register.js"
import bookRoute from "./routes/books.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";


import connectDB from "./services/dbcon.js"

connectDB(process.env.DB_URL);

const app = express();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
  }));
app.use(express.json());  
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));  


app.use("/", authRoutes);  
app.use("/",registerRoute);

app.use("/",bookRoute)

app.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' }); 
  res.status(200).json({ message: 'Logged out successfully' });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    
});
