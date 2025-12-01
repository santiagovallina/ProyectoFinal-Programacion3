import express from "express";
const app = express();

import connection from "./src/api/database/db.js";
import enviroments from "./src/api/config/enviroments.js"; // Importamos las variables de entorno para definir el puerto

const PORT = enviroments.port;

import cors from "cors";

import { productRoutes, viewRoutes, ventasRoutes, usuariosRoutes } from "./src/api/routes/index.js"; 
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

// ================================
import path from "path";/* path: modulo nativo de node.js para manejar rutas de archivo y carpeta de 
forma segura  */
import { fileURLToPath } from "url"; /* convierte la URL del archivo actual 
(ejemplo: file:///C:/proyecto/index.js) en una ruta real del sistema (C:/proyecto/index.js) */

const __filename = fileURLToPath(import.meta.url); /* guarda la ruta completa
del archivo actual (index.js) */
const __dirname = path.dirname(__filename); /* guarda 
la carpeta del archivo*/


/* SERVIR ARCHIVOS ESTATICOS: Le decís a Express: “todo lo que esté dentro
de src/views puede pedirse directamente desde el navegador”. */ 
app.use(express.static(path.join(__dirname, "src/public")));


app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", path.join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto

app.use(express.static(path.join(__dirname, "src/public")));



/* MIDDLEWARES */ 
app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// routes 
app.use("/productos", productRoutes);
app.use("/", viewRoutes);
app.use("/ventas", ventasRoutes);
app.use("/usuarios", usuariosRoutes);


/* Arranca el servidor express en el puerto definido */
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", path.join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto




