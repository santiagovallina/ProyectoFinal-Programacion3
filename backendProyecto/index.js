import express from "express";
const app = express();

import connection from "./src/api/database/db.js";
import enviroments from "./src/api/config/enviroments.js";

const PORT = enviroments.port;

import cors from "cors";

import { productRoutes, viewRoutes, ventasRoutes, usuariosRoutes, loginRoutes } from "./src/api/routes/index.js"; 
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

import { __dirname, join } from "./src/api/utils/index.js"

import formMiddleware from "./src/api/middlewares/form.middleware.js";
import sessionMiddleware from './src/api/middlewares/session.middleware.js';


/* Sirve archivos estaticos */ 
app.use(express.static(join(__dirname, "src/public")));

app.set("views", join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas


/* MIDDLEWARES */ 
app.use(cors());
app.use(express.json());
app.use(loggerUrl);
app.use(sessionMiddleware);
app.use(formMiddleware);

// routes 
app.use("/productos", productRoutes);
app.use("/", viewRoutes);
app.use("/ventas", ventasRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/", loginRoutes);


/* Arranca el servidor express en el puerto definido */
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});




