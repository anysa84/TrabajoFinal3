const formLogin = document.getElementById('formLogin');
const errorMessage = document.getElementById('errorMessage');

const baseURL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://tu-dominio-en-render.com';
//const baseURL = 'http://localhost:3000';

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

  // Validación de Email
  if (!validarEmail(email)) {
    errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido';
    return;
  }

  try {
    const res = await axios.post(`${baseURL}/login`, { email, contraseña });
    
    if (res.data.message === 'Usuario Reconocido') {
      alert('Usuario Reconocido');
      window.location.href = 'index.html'; // Redirige a index.html
    } else {
      errorMessage.textContent = 'Credenciales incorrectas. Inténtalo de nuevo.';
    }
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.textContent = error.response.data.message;
    } else {
      errorMessage.textContent = 'Error al iniciar sesión';
    }
  }
});

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
