let contenedorProductos = document.getElementById("contenedor-productos");
let altaProductsForm = document.getElementById("altaProducts-form");
let url = "http://localhost:3000";

altaProductsForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(formData);

    let data = Object.fromEntries(formData.entries());
    console.log(data);

    try {

        let response = await fetch(`${url}/productos`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json" /* le dice al servidor
                que el body esta en formato json*/
            },
            body: JSON.stringify(data)
            /* body: los datos que le quiero enviar al servidor.
            con JSON.stringify lo convierto en texto json */
        });

        console.log(response);
        
        let result = await response.json();
        console.log(result)

        if (response.ok) {
            console.log(result.message);
            alert(`Producto creado con exito con id: ${result.productId}`)};
    } catch (error){
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
})


let altaUsers_container = document.getElementById("altaUsers-container");

altaUsers_container.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);
    let data = Object.fromEntries(formData.entries());

    try{
        let response = await fetch(`${url}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        if(response.ok){
            let result = await response.json();
            alert(result.message)
        }
    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud");
    }
});