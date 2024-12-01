require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log(err));

/**Estructura de la Base de Datos */
const cancionSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, index: true },
  titulo: String,
  album: String,
  año: Number,
  urlPortada: String,
  urlYoutube: String
});

const usuarioSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, index: true },
  nombre: String,
  apellido: String,
  anioNacimiento: Number,
  apodo: String,
  email: { type: String, unique: true, required: true },
  contraseña: String
});

const Cancion = mongoose.model('cancions', cancionSchema);
const Usuario = mongoose.model('Usuario', usuarioSchema);

/**Manejo Canciones */
app.get('/canciones', async (req, res) => {
  const canciones = await Cancion.find();
  res.json(canciones);
});

app.post('/canciones', async (req, res) => {
  const ultimaCancion = await Cancion.findOne().sort({ id: -1 });
  const nuevoID = ultimaCancion ? ultimaCancion.id + 1 : 1;

  const nuevaCancion = new Cancion({
    id: nuevoID,
    ...req.body
  });

  await nuevaCancion.save();
  res.json(nuevaCancion);
});

app.put('/canciones/:id', async (req, res) => {
  const { id } = req.params;
  const actualizadaCancion = await Cancion.findOneAndUpdate({ id: id }, req.body, { new: true });
  res.json(actualizadaCancion);
});

app.delete('/canciones/:id', async (req, res) => {
  const { id } = req.params;
  await Cancion.findOneAndDelete({ id: id });
  res.json({ message: 'Cancion eliminada' });
});

/**Manejo Usuarios */
app.post('/usuarios', async (req, res) => {
  const { nombre, apellido,anioNacimiento, apodo, email, contraseña} = req.body;

  const usuarioExistente = await Usuario.findOne({ email: email });
  if (usuarioExistente) {
    return res.status(400).json({ message: 'El email ya está en uso' });
  }

  const ultimoUsuario = await Usuario.findOne().sort({ id: -1 });
  const nuevoID = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

  const nuevoUsuario = new Usuario({
    id: nuevoID,
    ...req.body
  });

  await nuevoUsuario.save();
  res.json(nuevoUsuario);
});

app.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email, contraseña });
    if (usuario) {
      res.json({ message: 'Usuario Reconocido' });
    } else {
      res.status(400).json({ message: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
