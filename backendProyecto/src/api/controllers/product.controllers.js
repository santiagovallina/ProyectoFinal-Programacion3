import productModel from "../models/product.models.js";

/* Todas estas funciones reciben promesas de product.models y devuelven los
resultados esperados. */


//Traer todos los productos
export const getAllProducts = async (req, res) => {
    try{
        const [rows] = await productModel.selectAllProducts();
        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "no se encontraron productos" : "productos encontrados" 
        });
    }
    catch (error){
        console.error("Error obteniendo los productos", error.message);
        res.status(500).json({
            message: "Error al obtener los productos"
        });
    }
}

//Trae producto por id
export const getProductById = async (req, res) => {
    try{
        let {id} = req.params;
        
        let [rows] = await productModel.selectProducWheretId(id);

        if(rows.length === 0) {
            
            console.log(`Error, no se encontro el producto con id ${id}`);

            return res.status(404).json({
                message: `No se encontro el prodcuto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows,
            message: "Prodcuto encontrado"
        });
    }
    catch(error){
        
        console.error(`Error obteniendo productos con id ${id}`, error.message);

        res.status(500).json({
            message: "Error al obtener producto con id"
        });
    }
    
}

//Crear producto
export const createProduct = async (req, res) => {

    try{
        console.log("Body recibido:", req.body);
        let { name, image, price} = req.body;
        console.log(req.body);

        if( !image || !name || !price){
            return res.status(400).json({
                message: "Error. Complete todos los campos"
            });
        }

        let [result] = await productModel.InsertProduct(name, image, price);
        console.log(result);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: result.insertId
        });

    } catch(error){
        console.log(error);

        res.status(500).json({
            message: "Error del servidor", 
            error: error.message
        });
    }

}

//Actualizar producto
export const updateProduct = async (req, res) => {

    try{
        let {id, name, image, price} = req.body;

        if (!id || !name || !image || !price){
            return res.status(400).json({
                message: "completar todos los campos"
            });
        }

        let [result] = await productModel.updateProduct(name, image, price, id);
        console.log(result);

        if(result.affectedRows === 0) {
            return res.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        res.status(200).json({
            message: `Producto actualizado con id ${id} actualizado `
        })
    }
    catch(error){
        console.error("Error ak actualizar el producto", error);

        res.status(500).json({
            message: "Error interno del servidor", error
        });
    }
}

//Borrar producto
export const deleteProduct = async (req, res) => {

    try{
        
        let {id} = req.params;

        let [result] = await productModel.deletProduct(id);
        console.log(result);

        if(result.affectedRows === 0){
            res.status(400).json({
                message: "El producto no fue eliminado"
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado`
        });
    }
    catch(error){
        console.error("Error al eliminar el producto", error);
        res.status(500).json({
            message: `Error al elimiar el producto con id ${id}`, error,
            error: error.message
        });
    }
}