// const express = require("express")

//app.use('181.117.15.215')

//express.static


//API

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const songs = [
    { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1', year: 2021 },
    { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2', year: 2020 },
];

// Ruta para obtener todas las canciones
app.get('/songs', (req, res) => {
    res.json(songs);
});

// Ruta para obtener una canción por ID
app.get('/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('La canción no fue encontrada.');
    res.json(song);
});

// Agregar una nueva canción
app.post('/songs', (req, res) => {
    const song = {
        id: songs.length + 1,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        year: req.body.year,
    };
    songs.push(song);
    res.status(201).json(song);
});

// Actualizar una canción 
app.put('/songs/:id', (req, res) => {
    const song = songs.find(s => s.id === parseInt(req.params.id));
    if (!song) return res.status(404).send('La canción no fue encontrada.');

    song.title = req.body.title;
    song.artist = req.body.artist;
    song.album = req.body.album;
    song.year = req.body.year;
    res.json(song);
});

// eliminar una canción//
app.delete('/songs/:id', (req, res) => {
    const songIndex = songs.findIndex(s => s.id === parseInt(req.params.id));
    if (songIndex === -1) return res.status(404).send('La canción no fue encontrada.');

    const deletedSong = songs.splice(songIndex, 1);
    res.json(deletedSong);
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
