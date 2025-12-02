import dotenv from "dotenv";
/*Importo dotenv: una libreria que sirve para leer las variables 
de entorno que tengo en el archivo .env*/

dotenv.config(); /*Carga automaticamente las variable del archivo
.env en process.env*/

/*Esto es un objeto que se exporta y tiene dos propiedades, port y database.
database: es una de las dos propiedades, cuyo valor es un objeto con las
credenciales de la conexion*/
export default{
    port: process.env.PORT || 3100,
    database: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    session_key: process.env.SESSION_KEY

}