
class Usuario {
  constructor(nombre, userName, passwword) {
    this.nombre = nombre;
    this.userName = userName;
    this.passwword = passwword;

  }

  validarUsuario(userName, passwword) {
    return this.userName === userName && this.passwword === passwword;
  }

}

const usuarios = [
  new Usuario("Yolimar Espinoza", "yoli", "1234"),
  new Usuario("Luis", "luifer", "1234"),
  new Usuario("William", "will", "4321"),
  new Usuario("Alejandro", "drako", "1425"),
];


const headerNav = document.getElementById("header");
const swiperSlider = document.querySelectorAll(".swiper-slide");

const nav = document.createElement('nav');
const aLogo = document.createElement('a');
const imgLogo = document.createElement('img');
const descLogo = document.createElement('span');
const divNav = document.createElement('div');
const divNavContainer = document.createElement('div');
const divNavLogo = document.createElement('div');
const divIconNav = document.createElement('div');
let sesionIni;



const menuItems = [
  { name: 'Inicio', link: 'index', icon: '' },
  { name: 'Carta', link: 'products', icon: '' },
  { name: 'Somos', link: 'whous', icon: '' },
  { name: 'Contacto', link: 'contact', icon: '' },
  { name: 'login', link: 'login', icon: "../img/iconos/login.png" },
  { name: 'cart', link: 'cart', icon: "../img/iconos/compras.png" }
];


const currentUrl = ObtenerURL(window.location.href);
const currentPath = window.location.pathname;

divNavContainer.className = "nav-container";

imgLogo.src = "./img/ArepasonlineLogo.png";
imgLogo.alt = "Logo";
imgLogo.id = "logo";
descLogo.id = "desclogo";
descLogo.innerText = "Arepas Online";

aLogo.href = `${menuItems[0].link}.html`;

aLogo.appendChild(imgLogo);
aLogo.appendChild(descLogo);

aLogo.className = "div-nav-a-logo"
divNavLogo.className = "div-nav-logo";
divNavLogo.appendChild(aLogo);

nav.appendChild(divNavLogo);
nav.appendChild(divNav);
nav.appendChild(divIconNav);

divNav.className = "div-nav-ovalo";



menuItems.forEach(item => {
  const aLista = document.createElement('a');
  if (item.name !== "cart" && item.name != "login") {
    aLista.href = `${item.link}.html`;
    aLista.textContent = item.name;
    divNav.appendChild(aLista);
  } else if (item.name === 'cart') {
    aLista.id = 'cart';
    aLista.href = `${item.link}.html`;
    const imgCart = document.createElement('img');
    imgCart.className = "a-img-cart";
    imgCart.src = `${item.icon}`;
    aLista.appendChild(imgCart);
    const spanCuentaCarrito = document.createElement('span');
    spanCuentaCarrito.id = "cuenta-carrito";
    spanCuentaCarrito.textContent = 0;
    aLista.appendChild(spanCuentaCarrito);
    divIconNav.appendChild(aLista);
  } else if (item.name === 'login') {
    aLista.id = 'login';
    aLista.href = "#";
    const imgLogin = document.createElement('img');
    const userLogged = document.createElement('span');
    sesionIni = '';
    userLogged.id = "userLogged";
    userLogged.innerText = "Iniciar sesion";
    imgLogin.className = "a-img-login";
    imgLogin.src = `${item.icon}`;

    aLista.appendChild(userLogged);
    aLista.appendChild(imgLogin);
    divIconNav.appendChild(aLista);
  }
});


divNavContainer.appendChild(nav);
headerNav.appendChild(divNavContainer);


const loginUser = document.getElementById('login');
const tituloUser = document.getElementById('userLogged');
const userLog = document.getElementById('HolaUsuario');


if (localStorage.getItem("sesionActiva")) {
  const sesionIniciada = JSON.parse(localStorage.getItem("sesionActiva"));
  if (currentUrl == "index.html") {
    userLog.textContent = `Hola ${sesionIniciada.nombre}`;
    userLog.style.color = "white";
  }
  tituloUser.textContent = `${sesionIniciada.nombre}`;
  tituloUser.style.color = "white";
  sesionIni = sesionIniciada.nombre;
}


loginUser.addEventListener('click', (e) => {
  e.preventDefault();
  if (localStorage.getItem("sesionActiva")) {
    Swal.fire({
      position: "top",
      title: "¿Esta Seguro?",
      text: "Se cerrara la sesion",
      showCancelButton: true,
      confirmButtonText: "Si, cerrar sesion!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("sesionActiva");
        if (currentUrl == "index.html") {
          userLog.textContent = `HOLA`;
          userLog.style.color = "";
        }
        tituloUser.textContent = `Hola`;
        tituloUser.style.color = "yellow";
        sesionIni = "";
        this.location.reload();
      }
    });
  }
  else {

    Swal.fire(
      {
        title: "Iniciar Sesion",
        html: `<input type="text" id="username" class="swal2-input" placeholder="Usuario">
          <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: "Iniciar sesión",
        focusConfirm: false,
        preConfirm: () => {
          const username = Swal.getPopup().querySelector('#username').value;
          const password = Swal.getPopup().querySelector('#password').value;
          if (!username || !password) {
            Swal.showValidationMessage(`Por favor ingresa ambos Campos`);
            return false;
          }
          return { username: username, password: password };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const { username, password } = result.value;
          const usuario = usuarios.find(user => user.validarUsuario(username, password));
          if (usuario) {
            if (currentUrl == "index.html") {
              userLog.textContent = `Hola ${usuario.nombre}`;
              userLog.style.color = "white";
            }
            tituloUser.textContent = `${usuario.nombre}`;
            sesionIni = usuario.nombre;
            localStorage.setItem("sesionActiva", JSON.stringify(usuario));
            Swal.fire({

              title: `Bienvenido, ${usuario.nombre}`,
              icon: 'success',
              timer: 1500
            });
            tituloUser.style.color = "green";
          }
          else {
            Swal.fire("Error", "Usuario o contraseña incorrecto", "error");
          }
        }
      })
  }

});


function ObtenerURL(direction) {
  const fullUrl = direction;
  const url = new URL(fullUrl);
  const pathUrls = url.pathname.split('/');
  return pathUrls[pathUrls.length - 1];
}

const navLinks = document.querySelectorAll('.div-nav-ovalo a');

navLinks.forEach(links => {
  if (links.id != 'cart') {
    const probando = ObtenerURL(links.href);
    if (probando == currentUrl) {
      links.classList.add('active');
    }
  }
  links.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(links => links.classList.remove('active'));
    links.classList.add('active');
    window.location.href = links.href;
  })
})

