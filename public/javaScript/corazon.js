document.addEventListener('DOMContentLoaded', () => {
    const heartButtons = document.querySelectorAll('.corazon');
    const playButtons = document.querySelectorAll('.play-btn');
    const songList = document.getElementById('song-list');
    const videoPlayer = document.getElementById('video-player');
    const playerContainer = document.getElementById('player-container');
    const closePlayerBtn = document.getElementById('close-player-btn');
    const generatePlaylistBtn = document.getElementById('generate-playlist-btn');
    const playlistUrlElement = document.getElementById('playlist-url');
    const playlist = [];

    heartButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('liked');
            const songName = button.parentElement.getAttribute('data-song');
            if (button.classList.contains('liked')) {
                playlist.push(songName);
            } else {
                const index = playlist.indexOf(songName);
                if (index > -1) {
                    playlist.splice(index, 1);
                }
            }
            updatePlaylist();
        });
    });

    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const songUrl = button.parentElement.getAttribute('data-url');
            videoPlayer.src = songUrl;
            playerContainer.style.display = 'block';
        });
    });

    closePlayerBtn.addEventListener('click', () => {
        playerContainer.style.display = 'none';
        videoPlayer.src = '';
    });

    generatePlaylistBtn.addEventListener('click', () => {
        const videoIds = playlist.map(song => document.querySelector(`[data-song="${song}"]`).getAttribute('data-id'));
        const playlistUrl = `https://www.youtube.com/watch_videos?video_ids=${videoIds.join(',')}`;
        playlistUrlElement.textContent = playlistUrl;
        playlistUrlElement.href = playlistUrl;
        playlistUrlElement.target = '_blank';
    });

    function updatePlaylist() {
        songList.innerHTML = '';
        playlist.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song;
            songList.appendChild(li);
        });
        
    }
});
