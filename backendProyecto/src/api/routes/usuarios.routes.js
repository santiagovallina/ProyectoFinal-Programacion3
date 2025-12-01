import { Router } from "express";
const router = Router();
import { crearUsuario } from "../controllers/usuarios.controllers.js";

router.post("/", crearUsuario);

export default router;