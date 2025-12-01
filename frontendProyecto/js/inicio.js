const formNombre = document.getElementById("form-nombre");


formNombre.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();

    if(!isNaN(nombre) || nombre === "") {
        alert("El dato no es valido");
    } else {
        localStorage.setItem("cliente", nombre);
        window.location.href = "shop.html";
    }
})

const cliente = localStorage.getItem("cliente");


