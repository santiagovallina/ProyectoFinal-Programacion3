import connection from "../database/db.js";

/* Insertar venta */
const insertVenta = (cliente, total, fecha) => {
    let sql = `INSERT into ventas (usuario, precio, fecha) VALUES (?, ?, ?)`;
    return connection.query(sql, [cliente, total, fecha]);
}

/* Selecciono venta por id */
const selectVentaWhereId = (id)=> {
    let sql = `SELECT * FROM ventas WHERE ventas.id = ?`;
    return connection.query(sql, [id]);
}

/* Traigo todas las ventas */
const selectAllVentas = () => {
    let sql = `SELECT * FROM ventas`;
    return connection.query(sql);
}

export default {
    insertVenta,
    selectVentaWhereId,
    selectAllVentas
}