//AXIOS //

async function obtenerUsuarios() {
    try {
      const response = await axios.get(' http://localhost:3000/javaScript/index.js ');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  
 // obtenerUsuarios();