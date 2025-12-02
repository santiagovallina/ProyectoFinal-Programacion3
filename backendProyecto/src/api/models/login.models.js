import connection from "../database/db.js";

const getUsuariologeado = (correo, password) => {
    let sql = `SELECT * FROM usuarios where correo = ? AND password = ?`;
    return connection.query(sql, [correo, password]);
}

export default{
    getUsuariologeado
}