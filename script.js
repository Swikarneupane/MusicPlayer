// Initialize an empty array to store songs
let songs = [];

// Get references to HTML elements
const songForm = document.getElementById('songForm');
const player = document.getElementById('player');
const fileSelector = document.getElementById('addSong');
const songList = document.getElementById('songsWrapper');
const source = document.getElementById('source');
const currentSong = document.querySelector('#currentSong');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const volumeSlider = document.getElementById('volumeSlider');
const volumeText = document.getElementById('volumeText');
const progressBar = document.getElementById('progressBar');
const headphonesIcon = document.getElementById('headphones');

// Function to save songs to local storage
function saveSongs() {
  localStorage.setItem('songs', JSON.stringify(songs));
}

// Function to add a new song to the list and local storage
function addSong(title, audioFile) {
  const song = { title, audioFile };
  songs.push(song);
  saveSongs();
  displaySongs();
}

function createList() {
  const list = document.createElement('ol');
  for (let i = 0; i < songs.length; i++) {
    const items = document.createElement('li');
    items.appendChild(document.createTextNode(songs[i].title));
    items.classList.add('song');

    list.appendChild(items);
  }
  return list;
}

// Display saved songs
function displaySongs() {
  songList.innerHTML = '';
  const songListElement = createList();
  songList.appendChild(songListElement);

}

// On page load, check for existing songs in local storage
const storedSongs = JSON.parse(localStorage.getItem('songs'));
if (storedSongs) {
  console.log(storedSongs);
  songs = storedSongs;
  displaySongs();
}

// Event listener for the form submission
songForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const audioFileInput = document.getElementById('audioFile');

  if (audioFileInput.files.length === 0) {
    alert('Please select an audio file.');
    return;
  }

  const title = audioFileInput.files[0].name.replace(/\.[^/.]+$/, ''); // Remove file extension
  const audioFile = URL.createObjectURL(audioFileInput.files[0]);
  addSong(title, audioFile);

  // Clear the form inputs
  audioFileInput.value = ''; // Reset the file input
});

// Add event listeners for song clicks
songList.addEventListener('click', function (e) {
  if (e.target && e.target.tagName === 'LI') {
    const selectedSong = songs.find((song) => song.title === e.target.textContent);
    if (selectedSong) {
      playSelectedSong(selectedSong);
    }
  }
});

// Play a selected song
function playSelectedSong(song) {
  headphonesIcon.classList.remove('pulse');
  source.src = song.audioFile;
  currentSong.innerText = `Now Playing: ${song.title}`;
  player.load();
  player.play();
  headphonesIcon.classList.add('pulse');
}

// Play audio
function playAudio() {
  if (player.readyState) {
    player.play();
  }
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}

// Pause audio
function pauseAudio() {
  player.pause();
  pauseButton.style.display = 'none';
  playButton.style.display = 'block';
}

// Update volume
volumeSlider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume;
  volumeText.innerText = `${Math.round(volume * 100)}%`;
};

// Update progress bar
function updateProgress() {
  if (player.currentTime > 0) {
    progressBar.value = (player.currentTime / player.duration) * 100;
  }
}

// Add event listeners for audio controls
player.addEventListener('timeupdate', updateProgress);
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
