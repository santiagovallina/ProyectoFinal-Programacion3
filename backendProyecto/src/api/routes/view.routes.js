import { Router } from "express";
const router = Router();
import { vistaProductos } from "../controllers/views.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";

// Rutas de las vistas
router.get("/index",requireLogin, vistaProductos)


router.get("/consultar", requireLogin, (req, res) => {
    res.render("consultar");
});

router.get("/crear", requireLogin, (req, res) => {
    res.render("crear");
});

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar");
});

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar");
});

router.get("/login", (req, res) => {
    res.render("login");
}); 

// Exportamos todas las rutas
export default router;