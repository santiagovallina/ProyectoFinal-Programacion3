fetch("/productos")
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
    });

    fetch("/productos")
        .then(res => res.json())
        .then(data => {
            const lista = document.getElementById("lista-productos");
            data.payload.forEach(producto => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <p>Id: ${producto.id}</p>
                <p>${producto.nombre}</p>
                <p><strong>Precio: ${producto.precio}</strong></p>
            `;
            lista.appendChild(li);
            });
        })
        .catch(err => console.error("Error cargando productos", err));