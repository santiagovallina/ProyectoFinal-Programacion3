/* VARIABLES DEL DOM */
let carrito = [];
let htmlCarrito = "";
let productos = [];

/* VARIABLES DEL DOM */
const barraBusqueda = document.getElementById("barra-busqueda");

const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("contenedor-carrito");

const botonVaciarCarrito = document.getElementById("vaciar-carrito");

// Traigo los productos
fetch("http://localhost:3000/productos")
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
        productos = data.payload;
        mostrarLista(productos);
    });


/* ESCUCHADORES DE EVENTOS */
barraBusqueda.addEventListener("input", filtrarProducto);


/* Ejercicio 2 */
const alumno = {
    dni: "42375241",
    nombre: "Santiago",
    apellido: "Vallina"
};

function imprimirDatosAlumno() {
    const cliente = localStorage.getItem("cliente");
    const divNombre = document.getElementById("nombre")
    
    divNombre.textContent = `¡Bienvenido ${cliente}!`;
    console.log(`Cliente: ${cliente}`);
}



/* Ejercicio 3 */

/* recorro todos los elementos del array y con cada uno creo un bloque
de código html */
function mostrarLista(array){
    let htmlProductos = "";
    array.forEach(producto => { 
        htmlProductos += `
        <div class="card-producto">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button id="boton-productos" onclick="agregarACarrito(${producto.id})">Agregar al carrito</button>
        </div>
        `
    })
    contenedorProductos.innerHTML = htmlProductos;
}



/* Ejercicio 4 */

//recorro con filter y muestro los que su nombre coincida con lo ingresado
function filtrarProducto(){
    let valorBusqueda = barraBusqueda.value.toLowerCase(); 
    let productosFiltrados = productos.filter(producto => { 
        return producto.nombre.toLowerCase().includes(valorBusqueda)
    }) 
    mostrarLista(productosFiltrados);
}


/* Ejercicio 5 */

/* Recorro el carrito. Si la fruta ya se encuentra en este, le sumo uno a la cantidad.
    Si no está en el array, lo agrega. Muestra el carrito y lo actualiza.*/
function agregarACarrito(idProducto){
    let productoEnCarrito = carrito.find(producto => producto.id == idProducto);

    if(productoEnCarrito){
        productoEnCarrito.cantidad += 1;
    } else{
        let productoEnCarrito = productos.find(producto => producto.id == idProducto);
        carrito.push({ ...productoEnCarrito, cantidad: 1 }); //SPREAD: ... copia todas las propiedades de fruta y le cambia el valor a cantidad
    }

    console.log(carrito);
    mostrarCarrito();
    actualizarCarrito();
    imprimirContador(carrito)
}


/* Recorro el carrito, por cada elemento de este creo un bloque de código
html con algunos de sus datos. También muestro en pantalla el valor total del carrito.
*/
function mostrarCarrito(){
    htmlCarrito = "<ul>";
    carrito.forEach( (producto, index) => {
        htmlCarrito += 
        `
        <li class="bloque-item">
        <p class="nombre-item">${producto.nombre} - ${producto.precio} x${producto.cantidad}</p>
        <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar del carrito</button>
        </li>   
        `;
    })
    htmlCarrito += 
    `
            </ul>
            <div id="precio-y-vaciar"> 
                <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
                <p class="precio"><strong>Precio total: $${precioTotal()}</strong></p>
                <button id="btn-comprar">Comprar</button>
            </div>
    `;

    contenedorCarrito.innerHTML = htmlCarrito;
    // Mando peticion para crear venta
    const btnComprar = document.getElementById("btn-comprar");
    const url = "http://localhost:3000";

    btnComprar.addEventListener("click", async (event) => {
        
        let confirmacion = confirm("¡Querés realizar la compra?")
        if(!confirmacion){
            alert("Compra cancelada");
        } else {
            event.preventDefault();
    
            const cliente = localStorage.getItem("cliente");
            const total = precioTotal(); 
            const fecha = new Date().toISOString(); 
    
            const data = { cliente, total, fecha };
            console.log("Datos a enviar:", data);
    
            try {
                let response = await fetch(`${url}/ventas`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
    
                let result = await response.json();
                console.log("Respuesta JSON:", result);
    
                if (response.ok) {
                    alert(`Compra realizada con éxito.`);
                } else {
                    alert("Error al crear el ticket: " + result.error);
                }
            } catch (error) {
                console.error("Error al enviar los datos: ", error);
                alert("Error al procesar la solicitud");
            }
        }
    });
}

//recibo el indice del producto, lo elimino del carrito, y luego muestro y actualizo el carrito
function eliminarDelCarrito(indiceDelObj)
{
    carrito.splice(indiceDelObj, 1);
    mostrarCarrito();
    actualizarCarrito();
    imprimirContador(carrito)
}



/* Ejercicio 6 */

//guardo el estado del carrito
function actualizarCarrito() 
{
    localStorage.setItem("carrito", JSON.stringify(carrito));
}



/* Ejercicio 7 */
//cuento el total de productos en el carrito 
function imprimirContador(lista) {
    const divContador = document.getElementById("carrito-texto");
    const totalProductos = lista.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    divContador.textContent = `Carrito: ${totalProductos}`;
}



// recorro los productos del carrito y sumo los precios de cada uno
function precioTotal(){
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += producto.precio * producto.cantidad;
    });
    return precioTotal;
}





/* Ejercicio 9 */

//vacío el carrito iniciando el array sin nada, lo muestro y lo actualizo
function vaciarCarrito(){
    carrito = [];
    mostrarCarrito();
    actualizarCarrito();
    imprimirContador(carrito)
}






function init (){
    imprimirDatosAlumno()
    imprimirContador(carrito)
    mostrarLista(productos)
    mostrarCarrito()
}

init()




