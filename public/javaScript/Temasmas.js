//agregar tema al Album

// document.getElementById('addSongButton').addEventListener('click', function() {
//   const songInput = document.getElementById('songInput');
//   const songURL = songInput.value.trim();

//   if (songURL) {
//       const listItem = document.createElement('li');
//       const songLink = document.createElement('a');
//       songLink.href = songURL;
//       songLink.target = '_blank'; // Abrir en una nueva pestaña
//       songLink.rel = 'noopener noreferrer';
//       songLink.textContent = songURL;

//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Eliminar';
//       deleteButton.addEventListener('click', function() {
//           listItem.remove();
//       });

//       listItem.appendChild(songLink);
//       listItem.appendChild(deleteButton);
//       document.getElementById('musicList').appendChild(listItem);
//       songInput.value = ''; // Limpiar el campo de entrada
//   } else {
//       alert('Por favor, introduce una URL válida.');
//   }
// });
document.addEventListener('DOMContentLoaded', () => {
    const addSongButton = document.getElementById('addSongButton');
    const songNameInput = document.getElementById('songName');
    const songUrlInput = document.getElementById('songUrl');
    const musicList = document.getElementById('musicList');
  
    addSongButton.addEventListener('click', () => {
      const songName = songNameInput.value.trim();
      const songUrl = songUrlInput.value.trim();
  
      if (songName && songUrl) {
        const li = document.createElement('li');
        li.innerHTML = `${songName} - <a href="${songUrl}" target="_blank">${songUrl}</a> <button class="deleteButton">Eliminar</button>`;
        
        // Añadir evento de eliminación
        li.querySelector('.deleteButton').addEventListener('click', () => {
          musicList.removeChild(li);
        });
  
        musicList.appendChild(li);
  
        // Limpiar campos de entrada
        songNameInput.value = '';
        songUrlInput.value = '';
      } else {
        alert('Por favor, ingresa tanto el nombre como la URL de la canción.');
      }
    });
  });
  