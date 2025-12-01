import usuariosModel from "../models/usuarios.models.js";

export const crearUsuario = async (req, res) => {
    try{
        console.log("Body recibido:", req.body);
        let { correo, password } = req.body;

        if (!correo || !password){
            return res.status(400).json({
                message: "Error. Faltan campos o datos invalidos"
            });
        }

        let [result] = await usuariosModel.insertUsuario(correo, password);
    
        res.status(200).json({
            message: "Usuario creado con éxito",
            ventaId: result.insertId
        });
    
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error del servidor", 
            error: error.message
        })
    }
}