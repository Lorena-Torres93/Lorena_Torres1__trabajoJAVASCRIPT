// validaciones.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("presupuesto-form");
    const productoSelect = document.getElementById("producto");
    const plazoInput = document.getElementById("plazo");
    const extrasCheckboxes = document.querySelectorAll("input[name='extras']");
    const presupuestoOutput = document.getElementById("presupuesto");

    // Validación de datos de contacto
    form.addEventListener("submit", (event) => {
        if (!validarFormulario()) {
            event.preventDefault();
            alert("Por favor, revisa los datos del formulario antes de enviarlo.");
        }
    });

    // Actualización dinámica del presupuesto
    [productoSelect, plazoInput, ...extrasCheckboxes].forEach(element => {
        element.addEventListener("change", calcularPresupuesto);
    });

    function validarFormulario() {
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const condiciones = document.getElementById("condiciones").checked;

        const nombreValido = /^[a-zA-Z\u00C0-\u017F ]{1,15}$/.test(nombre);
        const apellidosValido = /^[a-zA-Z\u00C0-\u017F ]{1,40}$/.test(apellidos);
        const telefonoValido = /^\d{9}$/.test(telefono);
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!nombreValido) {
            alert("El nombre solo puede contener letras y tener un máximo de 15 caracteres.");
        }
        if (!apellidosValido) {
            alert("Los apellidos solo pueden contener letras y tener un máximo de 40 caracteres.");
        }
        if (!telefonoValido) {
            alert("El teléfono debe contener exactamente 9 dígitos.");
        }
        if (!emailValido) {
            alert("Por favor, introduce un correo electrónico válido.");
        }
        if (!condiciones) {
            alert("Debes aceptar las condiciones de privacidad.");
        }

        return nombreValido && apellidosValido && telefonoValido && emailValido && condiciones;
    }

    function calcularPresupuesto() {
        let total = parseFloat(productoSelect.value) || 0;
    
        // Sumar extras seleccionados
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseFloat(checkbox.value);
            }
        });
    
        // Aplicar descuento por plazo
        const plazo = parseInt(plazoInput.value) || 0;
        if (plazo >= 30) {
            total *= 0.9; // 10% de descuento
        } else if (plazo >= 15) {
            total *= 0.95; // 5% de descuento
        }
    
        // Actualizar el contenido del <output>
        presupuestoOutput.textContent = total.toFixed(2);
    }
    