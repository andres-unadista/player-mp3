import songs from './songs.json' assert {type: "json"};

// elements
let $iconMenu = document.querySelector('.song__icon-playlist');
let $startTime = document.querySelector('.song__time-execution');
let $endTime = document.querySelector('.song__time-end');
let $playlist = document.querySelector('.song__playlist');
let $songBackground = document.querySelector('.song__art-box');
let $songTitle = document.querySelector('.song__title');
let $songArtist = document.querySelector('.song__author');
let $controlBack = document.getElementById('backward');
let $controlPlayback = document.getElementById('playback');
let $controlNext = document.getElementById('forward');
let $iconPause = document.getElementById('pause');
let $iconPlay = document.getElementById('play');
let $imageColor = document.getElementById('image-color');
let $app = document.getElementById('app');
let $listPlaylist = document.getElementById('playlist');
const $audioElement = document.querySelector("#audio");

let music = songs;
let currentIndexSong = 0;
let statusMenu = false;
let statusControl = false;
const widthPlaylist = 275;
const widthPlayer = 350;
let isActive = false;

/* EVENTS LISTENERS */
$controlPlayback.addEventListener('click', handlePlay);
$controlNext.addEventListener('click', handleNextSong);
$controlBack.addEventListener('click', handlePreviousSong);
$audioElement.addEventListener('timeupdate', handleTimeAudio);
$iconMenu.addEventListener('click', handleMenu);
$audioElement.onloadedmetadata = function () {
  $endTime.textContent = formatTime(Math.floor($audioElement.duration));
};

$imageColor.onload = function () {
  let average_color = getaverageColor(this);
  handleBackground(average_color);
};

// Calling functions
getListTitles();
showInfoSong(music[0]);

function handleBackground(color) {
  let [red, green, blue] = color;
  document.body.style.backgroundImage = `radial-gradient(white, rgb(${red},${green},${blue}))`;
}

function getaverageColor(imagen) {
  let r = 0, g = 0, b = 0, count = 0, canvas, ctx, imageData, data, i, n;
  canvas = document.createElement('canvas');
  ctx = canvas.getContext("2d");
  canvas.width = imagen.width;
  canvas.height = imagen.height;
  ctx.drawImage(imagen, 0, 0);
  imageData = ctx.getImageData(0, 0, imagen.width, imagen.height);
  data = imageData.data;
  for (i = 0, n = data.length; i < n; i += 4) {
    ++count;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  r = ~~(r / count);
  g = ~~(g / count);
  b = ~~(b / count);
  return [r, g, b];
}

function getListTitles() {
  let index = 1;
  music.map(song => {
    $listPlaylist.innerHTML += `<li>${index++}. ${song.title}</li>`;
    return;
  });
}

function nextIndexSong() {
  if (currentIndexSong >= (music.length - 1)) return currentIndexSong = 0;

  return ++currentIndexSong;
}

function beforeIndexSong() {
  if (currentIndexSong <= 0) return currentIndexSong = (music.length - 1);

  return --currentIndexSong;
}

function handlePlay() {
  if (!statusControl) {
    toggleElement($iconPause, true);
    toggleElement($iconPlay, false);
    $audioElement.play();
    isActive = true;
  } else {
    toggleElement($iconPause, false);
    toggleElement($iconPlay, true);
    $audioElement.pause();
    isActive = false;
  }
  statusControl = !statusControl;
}

function handleTimeAudio() {
  $startTime.textContent = formatTime(Math.floor(this.currentTime));
}

function formatTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  minutes = minutes.toString();
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function handleNextSong() {
  let index = nextIndexSong();
  console.log("🚀 ~ file: main.js:94 ~ handleNextSong ~ index", index);
  showInfoSong(music[index]);
}

function handlePreviousSong() {
  let index = beforeIndexSong();
  console.log("🚀 ~ file: main.js:102 ~ handlePreviousSong ~ index", index);
  showInfoSong(music[index]);
}

function showInfoSong(song) {
  if (isActive) {
    handlePlay();
  }
  $audioElement.pause();
  let background = `url('./public/images/${song.image}')`;
  $songBackground.style.backgroundImage = background;
  $audioElement.src = song.url;
  $imageColor.src = `./public/images/${song.image}`;

  $songTitle.textContent = song.title;
  $songArtist.textContent = song.artist;
}

function handleMenu() {
  statusMenu = !statusMenu;
  if (statusMenu) {
    $app.style.width = `${widthPlaylist + widthPlayer}px`;
  } else {
    $app.style.width = `${widthPlayer}px`;
  }
  toggleElement($playlist, statusMenu);
}

function toggleElement($element, state) {
  if (state) {
    $element.classList.remove('hide');
    $element.classList.add('show');
  } else {
    $element.classList.remove('show');
    $element.classList.add('hide');
  }
}

