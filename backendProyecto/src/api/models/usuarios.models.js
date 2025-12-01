import connection from "../database/db.js";

const insertUsuario = (correo, password) => {
    let sql = `INSERT into usuarios (correo, password) VALUES (?, ?)`;
    return connection.query(sql, [correo, password]);
}

export default {
    insertUsuario
}