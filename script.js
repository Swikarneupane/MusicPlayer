const songs = [
  "Ashutosh KC - MAYA.mp3",
  "Ayush Gauchan - Maya.mp3",
  "Yabesh Thapa - Mero Priye.mp3",
  "Kalo Keshma Relimai - Dinesh Dhakal.mp3",
  "Sajjan Raj Vaidya - Naganya Maya.mp3",
]

const player = document.getElementById("player")

// songs.push(newSong)
// console.log(newSong)

const fileSelector = document.getElementById('addSong');
  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    console.log(fileList);
  });



function createList() {
  const list = document.createElement("ol")
  for (let i = 0; i < songs.length; i++) {
    const items = document.createElement("li")
    items.appendChild(document.createTextNode(songs[i]))
    list.appendChild(items)
  }
  return list
}

const songList = document.getElementById("songsWrapper")
songList.appendChild(createList())

const links = document.querySelectorAll("li")
for (const link of links) {
  link.addEventListener("click", setSong)
}

function setSong(e) {
  document.getElementById("headphones").classList.remove("pulse")

  const source = document.getElementById("source")
  source.src = "songs/" + e.target.innerText

  document.querySelector(
    "#currentSong"
  ).innerText = `Now Playing: ${e.target.innerText}`

  player.load()
  player.play()

  document.getElementById("headphones").classList.add("pulse")
}

function playAudio() {
  if (player.readyState) {
    player.play()
  }
  document.getElementById("play").style.display = "none"
  document.getElementById("pause").style.display = "block"
}

function pauseAudio() {
  player.pause()
  document.getElementById("pause").style.display = "none"
  document.getElementById("play").style.display = "block"
}

const slider = document.getElementById("volumeSlider")
slider.oninput = function (e) {
  const volume = e.target.value
  player.volume = volume
  document.getElementById("volumeTot").innerText = `${volume * 100}%`
}

function updateProgress() {
  if (player.currentTime > 0) {
    const progress = document.getElementById("progressBar")
    progress.value = (player.currentTime / player.duration) * 100
  }
}
