

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function agregarAlCarrito(producto, show) {
    let cuenta = 0;
    let memoria = localStorage.getItem('arepas');
    memoria = memoria ? JSON.parse(memoria) : [];
    const indiceProducto = memoria.findIndex(arepa => arepa.id === producto.id);
    if (indiceProducto != -1) {
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }
    else {
        producto.cantidad = 1;
        cuenta = 1;
        memoria.push(producto);
    }
    localStorage.setItem('arepas', JSON.stringify(memoria));
    if (show == 1) {
        Toastify({
            text: `La arepa de ${producto.nombre} se agrego al carrito`,
            duration: 3000
        }).showToast();
    }
    else {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `La arepa de ${producto.nombre} se agrego al carrito`,
            showConfirmButton: false,
            timer: 1500
        });
    }
    actualizarNumeroCarrito();
    return cuenta;
}
function restarAlCarrito(producto) {
    let memoria = localStorage.getItem('arepas');
    memoria = memoria ? JSON.parse(memoria) : [];

    const indiceProducto = memoria.findIndex(arepa => arepa.id === producto.id);
    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    }
    else {
        memoria[indiceProducto].cantidad--;
    }
    localStorage.setItem('arepas', JSON.stringify(memoria));
    actualizarNumeroCarrito();
}


function eliminarProducto(id) {
    let carrito = localStorage.getItem('arepas');
    carrito = carrito ? JSON.parse(carrito) : [];

    const foundId = carrito.find((element) => element.id === id);
    carrito = carrito.filter((carritoId) => carritoId !== foundId);
    localStorage.setItem('arepas', JSON.stringify(carrito));
    actualizarNumeroCarrito();

}
function actualizarNumeroCarrito() {

    let memoria = localStorage.getItem('arepas');
    memoria = memoria ? JSON.parse(memoria) : [];

    if (memoria && memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    }
    else {
        cuentaCarritoElement.innerText = 0;
    }
}


actualizarNumeroCarrito();
