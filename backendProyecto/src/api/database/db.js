import mysql2 from "mysql2/promise"; /*libreria que peormite conectarse 
a mysql desde node.js.
la version /promise hace que todas las operaciones devuelvan promesas, lo que 
permite usar async/await en las consultas*/
import enviroments from "../config/enviroments.js";

/*Aca uso destructuring
DESTRUCTURING: es una sintaxis de javascript que permite extraer valores de objetos
o arrays y asignarlos a variables de manera mas clara y concisa.
sin destructuring seria:  "const database = enviroments.database;"
*/
const { database } = enviroments;

/*Crea el pool de conexiones */
const connection = mysql2.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password
});

export default connection;