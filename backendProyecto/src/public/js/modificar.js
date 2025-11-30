let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let contenedorUpdate = document.getElementById("contenedor-update");
let url = "http://localhost:3000";

getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log("Formulario no enviado");
    console.log(event.target);

    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    let idProd = data.idProd;
    console.log(idProd);


    console.log(`Extraido valor numerico del formulario en la variable idProd, que vale ${idProd}`)

    try{

        let response = await fetch(`${url}/productos/${idProd}`);

        let datos = await response.json();

        let producto = datos.payload[0];

        mostrarProducto(producto);

    } catch(error) {
        console.log(error);
    }
});

function mostrarProducto(producto){

    console.table(producto);

    let htmlProducto =  `
        <li class="li-listados">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>Id: ${producto.id} </p> 
            <p>Nombre: ${producto.nombre} </p> 
            <p><strong>Precio: ${producto.precio}</strong></p>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
            </li>`;

    listaProductos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        formularioPutProducto(event, producto);
    });
}

function formularioPutProducto(event, producto){

    event.stopPropagation(); //evita la propagacion de eventos para que un evento no pise al otro

    let updateForm_html = `
    <form id="updateProducts-form">

        <input type="hidden" name="id" id="idProd" value="${producto.id}">

        <label for="nameProd">Nombre</label>
        <input type="text" name="name" id="nameProd" value="${producto.nombre}" required>

        <label for="imageProd">Url imagen</label>
        <input type="text" name="image" id="imageProd" value="${producto.imagen}" required>

        <label for="priceProd">Precio</label>
        <input type="number" name="price" id="priceProd" value="${producto.precio}" required>

        <br>
        <input type="submit" value="Actualizar producto">
    </form>
    `;  

    contenedorUpdate.innerHTML = updateForm_html;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", async event => {
        event.preventDefault();

        let formData = new FormData(event.target);

        let data = Object.fromEntries(formData.entries());

        try{
                    
            let response = await fetch(`${url}/productos/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            console.log(response);

            let result = await response.json();

            if(response.ok) {
                alert(result.message);

                listaProductos.innerHTML = "";
                contenedorUpdate.innerHTML = "";
            } else {
                alert(result.message);
                }

        } catch(error) {
            console.log(error);
        }
    });
}