const form = document.querySelector('.form-contact');

function verificarCamposFormulario(event) {

  

  const campos = [
    { id: 'nombres', mensaje: 'Por favor, ingrese su nombre.' },
    { id: 'correo', mensaje: 'Por favor, ingrese su correo.'},
    { id: 'telefono', mensaje: 'Por favor, ingrese su teléfono.' },
    { id: 'consulta', mensaje: 'Por favor, ingrese su consulta.' }
  ];

  let formularioCompleto = true;

  

  campos.forEach(campo => {
    const elemento = document.getElementById(campo.id);
    const errorMessage = document.getElementById(`error-${campo.id}`);
    errorMessage.classList.add("visible");

    elemento.style.marginBottom = 0;

    

    if (!elemento.value.trim()) {
      formularioCompleto = false;
      errorMessage.textContent = campo.mensaje; 
      errorMessage.style.color = 'red'; 
    } else {
      errorMessage.textContent = '';
    }
  });

  

  if (!formularioCompleto) {

    event.preventDefault(); 

    console.log("Por favor, complete todos los campos.");
  } else {
    console.log("Todos los campos están completos.");
  }
}



form.addEventListener('submit', verificarCamposFormulario);
