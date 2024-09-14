const contenedorTarjetas = document.getElementById("productos-container");
const buttonAgregar = document.querySelector(".card-button");

const tituloBus = document.getElementById("leyenda");
const inputBusqueda = document.querySelector('#busque');
const botonBusqueda = document.querySelector('#buscar');

const pathImg = "./img/arepas/";

function crearTarjetasProductosInicio(producto) {

    const card = document.createElement('div');
    card.className = "tarjeta-producto";

    const img = document.createElement('img');
    img.src = pathImg + producto.imagen;
    img.alt = producto.name;

    const content = document.createElement('div');
    content.className = "card-content";

    const titletarjeta = document.createElement('h4');
    titletarjeta.innerHTML = producto.nombre;

    const precioproducto = document.createElement('p');
    precioproducto.innerText = `$${producto.precio}`;

    const descripcionProducto = document.createElement('p');
    descripcionProducto.innerHTML = producto.descripcion;

    const button = document.createElement('button');
    button.className = 'card-button';
    button.textContent = "Agregar al Carrito";

    content.appendChild(titletarjeta);
    content.appendChild(precioproducto);
    content.appendChild(descripcionProducto);

    card.appendChild(img);
    card.appendChild(content);
    card.appendChild(button);

    return card;

}

const datosArepas = async () => {
    const response = await fetch(("arepas.json"));
    const data = await response.json();
    return data;
}

const showCards = async (filter) => {
    contenedorTarjetas.innerHTML = '';
    try {
        const data = await datosArepas();
        const productosFiltrados = data.filter(productos => filter === 'all' || productos.tipo === filter);
        if (productosFiltrados.length === 0) {

        } else {
            productosFiltrados.forEach(productos => {
                const producto = crearTarjetasProductosInicio(productos);
                contenedorTarjetas.appendChild(producto);
                producto.getElementsByTagName("button")[0].addEventListener("click", (e) => agregarAlCarrito(productos, 1));
            })
        }
        tituloBus.style.display = "none";
        inputBusqueda.value = '';
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
}

const showCardArepa = async (name) => {
    contenedorTarjetas.innerHTML = '';
    try {
        const arepas = await datosArepas();
        const filterArepa = arepas.filter(producto => producto.nombre.toUpperCase().includes(name));
        return filterArepa;
    }
    catch {
        console.error("Error al filtrar los  datos: ", error);
    }
}

showCards('all');

const inputSelector = document.querySelectorAll(".selector");
inputSelector.forEach(input => {
    input.addEventListener('click', () => {
        showCards(input.value);
    })
})

const leyenda = document.getElementById("leyenda");

inputBusqueda.addEventListener("input", function () {
    if (inputBusqueda.value === "") {
        showCards('all');
    }
});

botonBusqueda.addEventListener('click', async () => {

    if (inputBusqueda.value.trim()) {
        const name = inputBusqueda.value.toUpperCase();
        const filterProducto = await showCardArepa(name);
        if (filterProducto.length === 0) {
            leyenda.style.display = "block";
        } else {
            leyenda.style.display = "none";
            filterProducto.forEach(product => {
                const producto = crearTarjetasProductosInicio(product);
                contenedorTarjetas.appendChild(producto);
            })
        }
    }
})