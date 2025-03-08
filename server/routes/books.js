import express from "express";
import { handleAddBooks,handleGetBooks,handleDeleteBooks } from "../controllers/books.js";
import { verifyToken } from "../middlewares/jwt.js";

const router = express.Router();

router.get("/books",verifyToken,handleGetBooks);

router.post("/books",verifyToken,handleAddBooks);

router.delete("/books",handleDeleteBooks);

export default router;