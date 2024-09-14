
document.addEventListener('DOMContentLoaded', () => {

    const contenedorFormulario = document.querySelector(".contenedor-formulario");


    const h2 = document.createElement("h2");
    h2.textContent = "FORMULARIO DE CONTACTO";
    contenedorFormulario.appendChild(h2);

    const form = document.createElement('form');
    form.id = 'formulario';

    const fields = [
        { id: 'nombre', label: 'Nombre:', type: 'text', placeholder: 'First Name', validation: 'text' },
        { id: 'apellido', label: 'Apellido:', type: 'text', placeholder: 'Last Name', validation: 'text' },
        { id: 'correo', label: 'Correo Electrónico:', type: 'email', placeholder: 'Email Address', validation: 'email' },
        { id: 'comentarios', label: 'Escribi tu Comentario:', type: 'textarea', placeholder: 'Tell us your Comment', validation: 'textarea' }
    ]

    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-group';
        if (field.type === 'textarea') {
            div.classList.add('textarea-group');
        }
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;
        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = '10';
            input.cols = '30';
        }
        else {
            input = document.createElement('input')
            input.type = field.type;
        }
        input.id = field.id;
        input.name = field.id;
        input.setAttribute('data-validation', field.validation);
        input.placeholder = field.placeholder;
        if (field.id === "nombre" || field.id === "apellido") {
            input.maxLength = "30";
        }

        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });


    const titleRequisitos = document.createElement('span');
    titleRequisitos.innerHTML = `*Todos los campos son requeridos`;
    titleRequisitos.style.textAlign = "right";
    titleRequisitos.style.color = "#ff1e87";
    form.appendChild(titleRequisitos);

    const buttonSubmit = document.createElement('input');
    buttonSubmit.type = 'submit';
    buttonSubmit.value = 'Enviar';
    buttonSubmit.className = 'btn-enviar';
    form.appendChild(buttonSubmit);

    contenedorFormulario.appendChild(form);


    const expRegText = /^[^\d]*$/;
    const expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validarCampo(tipovalidacion, inputElemento) {
        const valor = inputElemento.value.trim();
        let esValido = false;

        switch (tipovalidacion) {
            case 'text':
                esValido = validar(valor, tipovalidacion);
                break;
            case 'email':
                esValido = validar(valor, tipovalidacion);
                break;
            case 'textarea':
                esValido = valor.length > 0 && valor !== '';
                break;
            default:
                esValido = true;
                break;
        }
        if (esValido) {
            inputElemento.classList.remove('input-error');
        } else {
            inputElemento.classList.add('input-error');
        }


    }

    function validar(value, tipo) {
        let resp = false;
        if (tipo == 'text') {
            if (value == null || value.length == 0 || !expRegText.test(value))
                resp = false;
            else
                resp = true;
        }
        else if (tipo == 'email') {
            if (value == null || value.length == 0 || !expRegEmail.test(value))
                resp = false;
            else
                resp = true;
        }


        return resp
    }
    const inputs = document.querySelectorAll('input[data-validation],textarea[data-validation]');

    inputs.forEach(input => {
        const tipovalidacion = input.getAttribute('data-validation');
        input.addEventListener('input', () => validarCampo(tipovalidacion, input));
    });



    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formularioValido = true;

        inputs.forEach(input => {
            const tipovalidacion = input.getAttribute('data-validation');
            validarCampo(tipovalidacion, input);
            if (input.classList.contains('input-error')) {
                formularioValido = false;
            }
        });
        if (formularioValido) {

            saveInfo().then(() => {
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('correo').value = '';
                document.getElementById('comentarios').value = '';
            });


        }
    });

    function saveInfo() {

        let data;
        const formData = {};

        form.querySelectorAll('.form-group').forEach(group => {
            data = group.querySelector('input,textarea');
            if (data) {
                formData[data.name] = data.value;
            }
        })
        let storeData = localStorage.getItem('formData');
        storeData = storeData ? JSON.parse(storeData) : [];

        storeData.push(formData);
        localStorage.setItem('formData', JSON.stringify(storeData));

        return Swal.fire({
            position: "center",
            icon: "success",
            title: `Sus Datos Fueron enviados Satisfactoriamente`,
            showConfirmButton: false,
            timer: 5000,
        });
    }
});





