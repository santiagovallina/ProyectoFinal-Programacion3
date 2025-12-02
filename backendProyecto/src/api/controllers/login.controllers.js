import loginModels from "../models/login.models.js"

const login = async (req, res) => {
    try {
        console.log("Body recibido:", req.body);
        let { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).render("login", {
                error: "Todos los campos son obligatorios!"
            });
        }

        let [rows] = await loginModels.getUsuariologeado(correo, password);

        if (rows.length === 0) {
            return res.render("login", {
                error: "Credenciales incorrectas!"
            });
        }

        const user= rows[0];
        console.table(user);

        // Guardamos la sesión
        req.session.user = {
            id: user.id,
            correo: user.correo
        };

        res.redirect("/index");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const logout = async (req, res) => {
    req.session.destroy((error) => {
        if(error) {
            console.error("Error al destruir la sesion", error);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            })
        }

        res.redirect("login"); // Redirigimos a login
    })
}

export default { login, logout};