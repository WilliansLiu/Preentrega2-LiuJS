// script.js
document.addEventListener('DOMContentLoaded', function() {
    const listaProductos = document.getElementById('lista-productos');
    const listaCarrito = document.getElementById('lista-carrito');

    // Cargar productos del carrito desde localStorage
    cargarCarrito();

    // Añadir evento a los botones "Añadir al Carrito"
    listaProductos.addEventListener('click', function(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const producto = e.target.previousElementSibling.textContent;
            agregarProductoAlCarrito(producto);
        }
    });

    function agregarProductoAlCarrito(producto) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(producto));
        const botonEliminar = document.createElement('button');
        botonEliminar.appendChild(document.createTextNode('Eliminar'));
        li.appendChild(botonEliminar);
        listaCarrito.appendChild(li);

        // Guardar el producto en localStorage
        guardarProducto(producto);

        // Añadir evento de eliminación al botón
        botonEliminar.addEventListener('click', function() {
            listaCarrito.removeChild(li);
            eliminarProducto(producto);
        });
    }

    function guardarProducto(producto) {
        let carrito = obtenerCarritoDeLocalStorage();
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function obtenerCarritoDeLocalStorage() {
        let carrito;
        if (localStorage.getItem('carrito') === null) {
            carrito = [];
        } else {
            carrito = JSON.parse(localStorage.getItem('carrito'));
        }
        return carrito;
    }

    function eliminarProducto(producto) {
        let carrito = obtenerCarritoDeLocalStorage();
        carrito = carrito.filter(function(p) {
            return p !== producto;
        });
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarrito() {
        let carrito = obtenerCarritoDeLocalStorage();
        carrito.forEach(function(producto) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(producto));
            const botonEliminar = document.createElement('button');
            botonEliminar.appendChild(document.createTextNode('Eliminar'));
            li.appendChild(botonEliminar);
            listaCarrito.appendChild(li);

            botonEliminar.addEventListener('click', function() {
                listaCarrito.removeChild(li);
                eliminarProducto(producto);
            });
        });
    }
});