/* router es una herramienta de express que sirve para crear un conjunto de
rutas independientes */
import { Router } from "express";
const router = Router();

import { createProduct,  getAllProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

import { validateId } from "../middlewares/middlewares.js";


// GET -> Traer todos los productos
router.get("/", getAllProducts);

// GET -> Traer producto por id
router.get("/:id", validateId,  getProductById);

// POST -> Crear un nuevo producto
router.post("/", createProduct);

// UPDATE -> Actualizar un producto
router.put("/:id", validateId, updateProduct);

// DELETE -> Borrar un producto
router.delete("/:id", validateId,  deleteProduct);


// Exporto todas las rutas
export default router;