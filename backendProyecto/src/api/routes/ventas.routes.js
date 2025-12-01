import { Router } from "express";
const router = Router();
import { crearVenta, getVentaById, getAllVentas } from "../controllers/ventas.controllers.js";
import { validateId } from "../middlewares/middlewares.js";

router.post("/", crearVenta);

router.get("/:id", validateId, getVentaById);

router.get("/", getAllVentas);

export default router;
