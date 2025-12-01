import ventasModel from "../models/ventas.model.js";

export const crearVenta = async (req, res) => {
    try{
        console.log("Body recibido:", req.body);
        let { cliente, total, fecha } = req.body;

        if (!cliente || !total || !fecha){
            return res.status(400).json({
                message: "Error. Faltan campos o datos invalidos"
            });
        }

        let [result] = await ventasModel.insertVenta(cliente, total, fecha);
    
        res.status(200).json({
            message: "Venta creada con exito",
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

export const getVentaById = async (req, res) => {
    try{
        let {id} = req.params;

        let [rows] = await ventasModel.selectVentaWhereId(id);

        if(rows.length === 0) {
            console.log(`Error, no se encontro el producto con id ${id}`);

            return res.status(404).json({
                message: `No se encontro el prodcuto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows,
            message: "Producto encontrado"
        })
    } catch(error) {
        console.error(`Error obteniendo productos con id ${id}`, error.message);

        res.status(500).json({
            message: "Error al obtener producto con id"
        });
    }

}

export const getAllVentas = async (req, res) => {
    try{
        const [rows] = await ventasModel.selectAllVentas();
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "no se encontraron productos" : "productos encontrados" 
        });
    } catch(error) {
        console.error("Error obteniendo los productos", error.message);
        res.status(500).json({
            message: "Error al obtener los productos"
        });
    }
}