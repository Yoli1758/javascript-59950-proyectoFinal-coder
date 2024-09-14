
const contenedorProductoCarrito = document.getElementById("productos-container-carrito");
const divTotales = document.getElementById("totales");
const mainCart = document.getElementById("mainCart");
const carritoVacio = document.querySelector(".carrito-vacio");

const sectionTotales = document.createElement('div');
const pUnidades = document.createElement('p');
const spanUnidades = document.createElement('span');
const spanTotales = document.createElement('span');
const pPrecio = document.createElement('p');
const buttonComprar = document.createElement('button');
const buttonReiniciarCarrito = document.createElement('button');
let flagTarjeta = 0;
const pathImg = "./img/arepas/";

function crearTarjetasProductosInicio() {

    let nuevoArticulo;
    contenedorProductoCarrito.innerHTML = "";
    let carrito = localStorage.getItem('arepas');
    carrito = carrito ? JSON.parse(carrito) : [];

    if (carrito && carrito.length > 0) {
        flagTarjeta = 1;
        carrito.forEach(producto => {
            nuevoArticulo = document.createElement('div');
            nuevoArticulo.classList = "tarjeta-producto-carrito";
            nuevoArticulo.innerHTML = `
    
            <img src="${pathImg + producto.imagen}"></img>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <div class="upDownDelete">
            <button class="restar">➖</button>
            <span class="cantidad">${producto.cantidad}</span>
            <button class="sumar">➕</button>
            <button class="Eliminar">❌</button>
            </div>
        
            `;
            contenedorProductoCarrito.appendChild(nuevoArticulo);


            let sumar = nuevoArticulo.querySelector(".sumar");
            sumar.addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerHTML = agregarAlCarrito(producto, 2);
                actualizarTotales()
            })

            let restar = nuevoArticulo.querySelector(".restar");
            restar.addEventListener("click", (e) => {
                restarAlCarrito(producto);
                location.reload();
            })

            let eliminar = nuevoArticulo.querySelector(".Eliminar");
            eliminar.addEventListener("click", (e) => {
                eliminarProducto(producto.id);
                location.reload();
            })

        });

        sectionTotales.id = "totales";
        mainCart.appendChild(sectionTotales);
        pUnidades.innerHTML = "Cantidad de Arepas:";
        spanUnidades.id = "unidades";
        spanUnidades.innerText = "0";
        pPrecio.innerHTML = `Precio a pagar: $`;
        spanTotales.id = "preciototal";
        spanTotales.innerText = "0";
        pUnidades.appendChild(spanUnidades);
        pPrecio.appendChild(spanTotales);
        sectionTotales.appendChild(pUnidades);
        sectionTotales.appendChild(pPrecio);
        buttonComprar.innerText = "Comprar";
        buttonComprar.id = "comprar";
        buttonReiniciarCarrito.innerText = "Vaciar Carrito";
        buttonReiniciarCarrito.id = "reiniciar";
        sectionTotales.appendChild(buttonComprar);
        sectionTotales.appendChild(buttonReiniciarCarrito);

        let comprar = document.querySelector("#comprar");
        comprar.addEventListener("click", () => {
            if (sesionIni != "") {
                const summary = showOrderSummary(sesionIni);
                Swal.fire({
                    title: "Gracias Por tu Compra",
                    html: summary,
                    footer: '<span">¡Que lo disfrutes!</span>',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    backdrop: false,
                    customClass: {
                        footer: 'footer-summary'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Compra Exitosa",
                            text: "Tu Orden ha sido Procesada con Exito",
                            icon: "success"
                        });
                    }
                    removerCarrito();
                });

            }
            else {
                Swal.fire("Debes iniciar sesion para finalizar la compra.");
            }
        })





        let ResetCart = document.querySelector("#reiniciar");
        ResetCart.addEventListener("click", () => {

            Swal.fire({
                title: "Esta Seguro de Eliminar la orden?",
                icon: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Aceptar"
            }).then((result) => {

                if (result.isConfirmed) {

                    Swal.fire({
                        title: "Borrar",
                        text: "Tu Orden ha sido Eliminada con Exito",
                        icon: "success"
                    });
                    removerCarrito();
                }
            });




        })
        carritoVacio.style.display = "none";
    }
    else {
        flagTarjeta = 0;
        carritoVacio.style.display = "flex";
    }


}
crearTarjetasProductosInicio();

if (flagTarjeta == 0) {
    contenedorProductoCarrito.style.border = "none";
    sectionTotales.style.display = "none";
}
else {
    contenedorProductoCarrito.style.border = "2px solid red";
    sectionTotales.style.display = "flex";
}

function removerCarrito() {
    localStorage.removeItem("arepas");
    location.reload();
}

function actualizarTotales() {
    let carrito = localStorage.getItem('arepas');
    carrito = carrito ? JSON.parse(carrito) : [];
    let unidades = 0;
    let precio = 0;

    if (carrito && carrito.length > 0) {
        carrito.forEach(producto => {
            unidades += producto.cantidad;
            precio += producto.precio * producto.cantidad;
        });
        spanUnidades.innerText = unidades;
        spanTotales.innerText = precio;
    }
    else {
        spanUnidades.innerText = unidades;
        spanTotales.innerText = precio;
    }
}

function showOrderSummary(user) {
    let carrito = localStorage.getItem('arepas');
    carrito = carrito ? JSON.parse(carrito) : [];

    let orderSummary = `<b id="strong-summary">${user}</b><br>Tu pedido fue:<br>`;
    let total = 0;

    carrito.forEach(item => {
        const itemTotal = item.cantidad * item.precio;
        total += itemTotal;
        orderSummary += `${item.cantidad} arepas de ${item.nombre} total:$${itemTotal}<br>`;
    });
    orderSummary += `<br>Total a pagar: <strong id="strong-summary">$${total}</strong>`;
    return orderSummary;
}

actualizarTotales();