//agregar tema al Album
document.getElementById('addSongButton').addEventListener('click', function() {
  const nameInput = document.getElementById('nameInput');
  const songInput = document.getElementById('songInput');
  const songName = nameInput.value.trim();
  const songURL = songInput.value.trim();

  if (songName && songURL) {
      const listItem = document.createElement('li');
      
      const songNameElement = document.createElement('span');
      songNameElement.textContent = songName + " - ";

      const songLink = document.createElement('a');
      songLink.href = songURL;
      songLink.target = '_blank'; // Abrir en una nueva pestaña
      songLink.rel = 'noopener noreferrer';
      songLink.textContent = songURL;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = '.                               -Eliminar';
      deleteButton.addEventListener('click', function() {
          listItem.remove();
      });

      listItem.appendChild(songNameElement);
      listItem.appendChild(songLink);
      listItem.appendChild(deleteButton);
      document.getElementById('musicList').appendChild(listItem);

      nameInput.value = ''; // Limpiar el campo de entrada de nombre
      songInput.value = ''; // Limpiar el campo de entrada de URL
  } else {
      alert('Por favor, introduce un nombre y una URL válida.');
  }
});
