const form = document.querySelector('.form-contact');

function verificarCamposFormulario(event) {

  // Selecciona todos los elementos del formulario que requieren validación

  const campos = [
    { id: 'nombres', mensaje: 'Por favor, ingrese su nombre.' },
    { id: 'correo', mensaje: 'Por favor, ingrese su correo.' },
    { id: 'telefono', mensaje: 'Por favor, ingrese su teléfono.' },
    { id: 'consulta', mensaje: 'Por favor, ingrese su consulta.' }
  ];

  let formularioCompleto = true;

  // Itera sobre los campos para verificar si están vacíos

  campos.forEach(campo => {
    const elemento = document.getElementById(campo.id);
    const errorMessage = document.getElementById(`error-${campo.id}`);
    errorMessage.classList.add("visible");

    elemento.style.marginBottom = 0;

    // Si el campo está vacío, muestra un mensaje de error

    if (!elemento.value.trim()) {
      formularioCompleto = false;
      errorMessage.textContent = campo.mensaje; 
      errorMessage.style.color = 'red'; 
    } else {
      errorMessage.textContent = '';
    }
  });

  // Si el formulario está incompleto, no permite el envío

  if (!formularioCompleto) {

    event.preventDefault(); // Previene el envío del formulario

    console.log("Por favor, complete todos los campos.");
  } else {
    console.log("Todos los campos están completos.");
  }
}

// Agrega un evento al formulario para validar antes de enviar

form.addEventListener('submit', verificarCamposFormulario);
