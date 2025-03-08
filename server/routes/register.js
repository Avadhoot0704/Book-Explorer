import express from "express";
import {handleRegister} from "../controllers/register.js"

const router = express.Router();

router.post("/register",handleRegister);

export default  router;