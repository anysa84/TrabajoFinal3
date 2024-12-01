const formUsuario = document.getElementById('formUsuario');
const errorMessage = document.getElementById('errorMessage');

//const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://cnblue-prueba.onrender.com';
const baseURL = 'http://localhost:3000';

formUsuario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const anioNacimiento = document.getElementById('añoNacimiento').value;
  const apodo = document.getElementById('apodo').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
  const verificarContraseña = document.getElementById('verificarContraseña').value;

  if (nombre.length < 5) {
    errorMessage.textContent = 'El nombre debe tener al menos 5 caracteres';
    return;
  }

  if (apellido.length < 2) {
    errorMessage.textContent = 'El nombre debe tener al menos 2 caracteres';
    return;
  }

  if (apodo.length < 5) {
    errorMessage.textContent = 'El apodo debe tener al menos 5 caracteres';
    return;
  }
  
  
  if (!validarEmail(email)) {
    errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido';
    return;
  }

  const edad = calcularEdad(añoNacimiento);
  if (edad < 18) {
    errorMessage.textContent = 'Debes tener al menos 18 años para registrarte';
    return;
  }

  if (contraseña !== verificarContraseña) {
    errorMessage.textContent = 'Las contraseñas no coinciden';
    return;
  }

  try {
    const res = await axios.post(`${baseURL}/usuarios`, {
      nombre,
      apellido,
      anioNacimiento,
      apodo,
      email,
      contraseña
    });
    alert('Usuario registrado con éxito');
    formUsuario.reset();
    errorMessage.textContent = '';
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.textContent = error.response.data.message;
    } else {
      errorMessage.textContent = 'Error al registrar el usuario';
    }
  }
});


function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function calcularEdad(añoNacimiento) { 
  const añoActual = new Date().getFullYear(); 
  return añoActual - añoNacimiento;
}