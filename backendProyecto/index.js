import express from "express";
const app = express();

import connection from "./src/api/database/db.js";
import enviroments from "./src/api/config/enviroments.js"; // Importamos las variables de entorno para definir el puerto

const PORT = enviroments.port;

import cors from "cors";

import { productRoutes } from "./src/api/routes/index.js"; 
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

// Página principal
app.get("/index", (req, res) => {
    res.render("index"); // busca src/views/index.ejs
});

// Crear producto
app.get("/crear", (req, res) => {
    res.render("crear"); // busca src/views/crear.ejs
});

// Consultar productos
app.get("/consultar", (req, res) => {
    res.render("consultar"); // busca src/views/consultar.ejs
});

// Modificar producto
app.get("/modificar", (req, res) => {
    res.render("modificar"); // busca src/views/modificar.ejs
});

// Eliminar producto
app.get("/eliminar", (req, res) => {
    res.render("eliminar"); // busca src/views/eliminar.ejs
});
// ================================





/* MIDDLEWARES */ 
app.use(cors());
app.use(express.json());
app.use(loggerUrl);

// routes 
app.use("/productos", productRoutes);

/* Primera peticion */
app.get("/", (req, res) => {
    console.log("Este endpoint ofrece una respuesta");
    res.json({mensaje: "hola desde /test"});
});


/* Arranca el servidor express en el puerto definido */
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas
app.set("views", path.join(__dirname, "src/views")); // Indicamos la ruta de las vistas en nuestro proyecto


/*
connection.query(sql) devuelve [rows, fields]
al escribir [rows] solo llama a este elemento
*/

/*
app.get( "/productos", async (req, res) =>  {

    try{
        const sql = "SELECT * FROM productos";
        const [rows] = await connection.query(sql);

        res.status(200).json({
            payload: rows
        })
    }
    catch(error){
        console.error("Error obteniendo productos", error.message);
        res.status(500).json({
            message: "error al obtener productos"
        });
    }
})
*/

