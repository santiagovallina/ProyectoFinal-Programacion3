let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let url = "http://localhost:3000/productos";


getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault();  /*evito que se mande el formulario por defecto.
    Asi puedo manejar el envio con fetch y mostrar el resultado sin que la 
    pagina se refresque*/

    /* target es el elemento HTML que disparó el evento*/
    console.log(event.target);

    /* guardo como objeto el valor recibido */
    let formData = new FormData(event.target);
    console.log(FormData);

    /* Transformo el objeto FormData en un objeto JavaScript
    ENTRIES: devuelve un iterador con todos los pares [clave, valor] del formulario */
    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProd = data.idProd;
    console.log(`Extraido el valor del id: ${idProd}`);

    try{

        let respuesta = await fetch(`http://localhost:3000/productos/${idProd}`)
        console.log(respuesta);

        let datos = await respuesta.json();
        console.log(datos);

        if(respuesta.ok){
            console.log(datos.payload);
            console.log(datos.payload[0]);

            let producto = datos.payload[0];

            mostrarProducto(producto);
        } else {
            console.error(datos.message);
            mostrarError(datos.message);
        }
    }catch(error){
                console.error(error);
            }
        });

    function mostrarProducto(producto){
        console.table(producto);

        let htmlProducto = `
            <li class="li-listados">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id} </p> 
                <p>Nombre: ${producto.nombre} </p> 
                <p><strong>Precio: ${producto.precio}</strong></p>
            </li>
        `;

        listaProductos.innerHTML = htmlProducto ;
    }

    function mostrarError(error) {

        let htmlError = `
            <li class="mensaje-error">
                <p>
                    <strong>Error:</strong>
                    <span>${error}</span>
                </p>
            </li>
        `;

        listaProductos.innerHTML = htmlError;
    }
