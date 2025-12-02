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

import session from "express-session";

const __filename = fileURLToPath(import.meta.url); /* guarda la ruta completa
del archivo actual (index.js) */
const __dirname = path.dirname(__filename); /* guarda 
la carpeta del archivo*/



/*========================================*/
app.use(session({
    secret: enviroments.session_key, // Firma las cookies para evitar manipulacion (por eso debe ser aleatoria y secreta)
    resave: false, // Evita guardar la sesion si no hubo cambios
    saveUninitialized: true // No guarda sesiones vacios
}));

// Middleware para parsear info de un <form>
// Middleware necesario para leer formularios HTML <form method="POST">
app.use(express.urlencoded({
    extended: true
}));

// Endpoint para inicio de sesion, recibimos correo y password con una peticion POST
app.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Evitamos consulta innecesaria
        if(!correo || !password) {
            return res.render("login", {
                error: "Todos los campos son obligatorios!"
            });
        }

        const sql = `SELECT * FROM usuarios where correo = ? AND password = ?`;
        const [rows] = await connection.query(sql, [correo, password]);

        // Si no existen usuarios con ese correo o password
        if(rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas!"
            });
        }

        console.log(rows);
        const user = rows[0];
        console.table(user);

        // Ahora toca guardar sesion y hacer el redirect
        // Crearmos la sesion del usuario, que es un objeto que guarda su id y su correo
        req.session.user = {
            id: user.id,
            correo: user.correo
        }

        res.redirect("/index"); // Redirigimos a la pagina principal

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

// Endpoint para cerrar sesion (destruir sesion y redireccionar)
app.post("/logout", (req, res) => {

    // Destruimos la sesion que habiamos creado
    req.session.destroy((error) => {
        if(error) {
            console.error("Error al destruir la sesion", error);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            })
        }

        res.redirect("login"); // Redirigimos a login
    })
});
/*========================================*/



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


