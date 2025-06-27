import express from "express";
import { register, login } from "../controllers/authController";

const router = express.Router();

router.post("/register", register); // register fonksiyonu artık doğru türde
router.post("/login", login);       // login fonksiyonu artık doğru türde


export default router;