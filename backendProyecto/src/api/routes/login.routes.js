import { Router } from "express";
import loginControllers from "../controllers/login.controllers.js"; 

const router = Router();

router.post("/login", loginControllers.login);
router.post("/logout", loginControllers.logout);

export default router;