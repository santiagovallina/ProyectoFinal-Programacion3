let getProduct_form = document.getElementById("getProduct-form");
let listaProductos = document.getElementById("lista-productos");
let url = "http://localhost:3000"

getProduct_form.addEventListener("submit", async (event) => {

    event.preventDefault();

    console.log(event.target);

    let formData = new FormData(event.target);

    let data = Object.fromEntries(formData.entries());

    let idProd = data.idProd;

    console.log(idProd); // 3

    console.log(`Extraido valor numerico del formulario en la variable idProd, que vale ${idProd}`)

    try{

        let response = await fetch(`${url}/productos/${idProd}`);

        let datos = await response.json();

        let producto = datos.payload[0];
        console.table(producto);

        let htmlProducto = `
            <li class="li-listados">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id}</p>
                <p>Nombre: ${producto.nombre}</p> 
                <p><strong>Precio: ${producto.precio}</strong></p>
            </li>
            <li class="li-botonera">
                <input type="button" id="deleteProduct_button" value="Eliminar producto">
            </li>
        `;

        listaProductos.innerHTML = htmlProducto;

        deleteProduct_button = document.getElementById("deleteProduct_button");

        deleteProduct_button.addEventListener("click", event => {
                    
            event.stopPropagation();

            let confirmacion = confirm("¿Querés eliminar este producto?");

            if(!confirmacion){
                alert("Eliminación cancelada");
            } else {
                eliminarProducto(data.id);
            }
        });

        async function eliminarProducto(id){

            try {

                let response = await fetch(`${url}/productos/${idProd}`, {
                    method : "DELETE"
                });

                let result = await response.json();

                if (response.ok) {
                    alert(result.message);
                    listaProductos.innerHTML = "";
                    }
            } catch (errror) {
                console.log("Error en la solicitud DELETE", error);
                alert("Ocurrió un error al eliminar un producto");
            }
        }


    } catch(error) {
        console.log(error);
    }
});