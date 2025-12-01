import { Router } from "express";
const router = Router();
import { vistaProductos } from "../controllers/views.controllers.js";
//import { requireLogin } from "../middlewares/middlewares.js";

// Rutas de las vistas
router.get("/index", vistaProductos);

router.get("/consultar", (req, res) => {
    res.render("consultar");
});

router.get("/crear", (req, res) => {
    res.render("crear");
});

router.get("/modificar", (req, res) => {
    res.render("modificar");
});

router.get("/eliminar", (req, res) => {
    res.render("eliminar");
});

/*router.get("/login", (req, res) => {
    res.render("login");
}); */

// Exportamos todas las rutas
export default router;