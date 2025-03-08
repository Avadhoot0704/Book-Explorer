import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;  
  
    if (!token) return res.status(401).json({ error: "Unauthorized" });
  
    jwt.verify(token, "SUCCESS_IS_KEY", (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid Token" });
  
      req.userId = decoded.userId; 
      next();
    });
  };
  