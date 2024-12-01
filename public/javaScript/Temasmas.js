//agregar tema al Album

document.getElementById('addSongButton').addEventListener('click', function() {
  const songInput = document.getElementById('songInput');
  const songURL = songInput.value.trim();

  if (songURL) {
      const listItem = document.createElement('li');
      const songLink = document.createElement('a');
      songLink.href = songURL;
      songLink.target = '_blank'; // Abrir en una nueva pestaña
      songLink.rel = 'noopener noreferrer';
      songLink.textContent = songURL;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '.                 - Eliminar';
      deleteButton.addEventListener('click', function() {
          listItem.remove();
      });

      listItem.appendChild(songLink);
      listItem.appendChild(deleteButton);
      document.getElementById('musicList').appendChild(listItem);
      songInput.value = ''; // Limpiar el campo de entrada
  } else {
      alert('Por favor, introduce una URL válida.');
  }
});