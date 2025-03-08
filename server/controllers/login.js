import bcrypt from "bcrypt";
import User from "../models/user.js"; 
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

    

        const user = await User.findOne({ username });
        
        if (!user) {
            
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        
        const token = jwt.sign({ userId: user._id }, "SUCCESS_IS_KEY", { expiresIn: "1h" });

        // Send JWT in HTTP-only cookie
        res
           .cookie("token", token, { httpOnly: true, secure: true })
          .status(200)
          .json({ message: "Login successful", success: true });

    } catch (error) {
      
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



