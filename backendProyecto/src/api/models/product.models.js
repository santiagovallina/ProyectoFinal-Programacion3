import connection from "../database/db.js";

/* Todas estas funciones devuelven promesas. 
Despues en controllers.products.js devuelven los resultados
*/

//el "?" es un placeholder

/* Traigo todos los productos */
const selectAllProducts = () => {
    let sql = `SELECT * FROM productos`;
    return connection.query(sql);
}

/* Selecciono producto por id */ 
const selectProducWheretId = (id) => {
    let sql = `SELECT * FROM productos WHERE productos.id = ?` ;  
    return connection.query(sql, [id]);
}

/* Insertar producto */
const InsertProduct = (name, image, price) => {
    let sql = `INSERT into productos (nombre, imagen, precio) VALUES (?, ?, ?)`;
    return connection.query(sql, [name, image, price]);
}

/* Actualizar producto */
const updateProduct = (name, image, price, id) => {
    let sql = `
        UPDATE productos
        SET nombre = ?, imagen = ?, precio = ?
        WHERE id = ?
    `;
    return connection.query(sql, [name, image, price, id]);
}

/* Borrar producto */
const deletProduct = (id) => {
    let sql = `DELETE FROM productos WHERE id = ?`;
    return connection.query(sql, [id]);
}

export default{
    selectAllProducts,
    selectProducWheretId,
    InsertProduct,
    updateProduct,
    deletProduct
}