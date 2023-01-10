import songs from './songs.json';

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
let $listPlaylist = document.getElementById('playlist');
const $audioElement = document.querySelector("#audio");

let music = songs;
let currentIndexSong = 0;
let statusMenu = false;
let statusControl = false;
let isSuspended = false;

/* EVENTS LISTENERS */
$controlPlayback.addEventListener('click', handlePlay);
$controlNext.addEventListener('click', handleNextSong);
$controlBack.addEventListener('click', handlePreviousSong);
$audioElement.addEventListener('timeupdate', handleTimeAudio);
$iconMenu.addEventListener('click', handleMenu);
$audioElement.onloadedmetadata = function () {
  $endTime.textContent = formatTime(Math.floor($audioElement.duration));
};

// Calling functions
getListTitles();
showInfoSong(music[0]);

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
  } else {
    toggleElement($iconPause, false);
    toggleElement($iconPlay, true);
    $audioElement.pause();
  }
  statusControl = !statusControl;

  // audioElement.resume();
  // audioElement.src =;
  // audioElement.play();
  // audioElement.pause();
  // Math.floor(audioElement.duration)
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
  $audioElement.pause();
  let background = `url('./public/images/${song.image}')`;
  $songBackground.style.backgroundImage = background;
  $audioElement.src = song.url;

  $songTitle.textContent = song.title;
  $songArtist.textContent = song.artist;
}

function handleMenu() {
  statusMenu = !statusMenu;
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

