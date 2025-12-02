
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorCarrito = document.getElementById("contenedor-carrito");

function mostrarCarrito() {
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    let html = "<ul>";
    carrito.forEach((producto, index) => {
        html += `
            <li class="bloque-item">
                <div id= "contenedor-nombre-item"> 
                    <p class="nombre-item">${producto.nombre} - $${producto.precio} x${producto.cantidad}</p>
                </div>
                <div id="contenerdor-boton-eliminar">
                    <button class="boton-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
                </li>
        `;
    });
    html += "</ul>";
    html += `
        <div id="precio-y-vaciar"> 
            <button id="vaciar-carrito" onclick="vaciarCarrito()">Vaciar carrito</button>
            <p class="precio"><strong>Total: $${precioTotal()}</strong></p>
            <button id="btn-comprar">Comprar</button>
        </div>
    `;

    contenedorCarrito.innerHTML = html;

    const btnComprar = document.getElementById("btn-comprar");
    const url = "http://localhost:3000";

    btnComprar.addEventListener("click", async (event) => {
        let confirmacion = confirm("¿Querés realizar la compra?");
        if (!confirmacion) {
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
                    alert("Compra realizada con éxito.");
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

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    imprimirContador();
}

function precioTotal() {
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += producto.precio * producto.cantidad;
    });
    return precioTotal;
}

function imprimirContador() {
    const divContador = document.getElementById("carrito-texto");
    const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
    divContador.textContent = `Carrito: ${total}`;
}

function initCarrito() {
    mostrarCarrito();
    imprimirContador();
}

initCarrito();
