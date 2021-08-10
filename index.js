const $image = document.querySelector('img'),
  $title = document.getElementById('title'),
  $artist = document.getElementById('artist'),
  $music = document.querySelector('audio'),
  $prevBtn = document.getElementById('prev'),
  $playBtn = document.getElementById('play'),
  $nextBtn = document.getElementById('next'),
  $progress = document.getElementById('progress'),
  $progressContainer = document.getElementById('progress-container'),
  $currentTime = document.getElementById('current-time'),
  $duration = document.getElementById('duration'),
  songs = [
    { name: 'jacinto-1', displayName: 'Electric Chill Machine', artist: 'Jacinto Design' },
    { name: 'jacinto-2', displayName: 'Seven Nation Army (Remix)', artist: 'Jacinto Design' },
    { name: 'jacinto-3', displayName: 'Goodnight, Disco Queen', artist: 'Jacinto Design' },
    { name: 'metric-1', displayName: 'front Row (Remix)', artist: 'Metric/Jacinto Design' },
  ];

//Check if Playing
let isPlaying = false;

//Play Handler
function PlaySong() {
  $playBtn.classList.replace('fa-play', 'fa-pause');
  $playBtn.setAttribute('title', 'Pause');
  isPlaying = true;
  $music.play();
}

//Pause Handler
function PauseSong() {
  $playBtn.classList.replace('fa-pause', 'fa-play');
  $playBtn.setAttribute('title', 'Play');
  isPlaying = false;
  $music.pause();
}

$playBtn.addEventListener('click', () => (isPlaying ? PauseSong() : PlaySong()));

function loadSong(song) {
  $title.textContent = song.displayName;
  $artist.textContent = song.artist;
  $music.src = `music/${song.name}.mp3`;
  $image.src = `img/${song.name}.jpg`;
}

let songIndex = 0;

//Button for switch back song
$prevBtn.addEventListener('click', () => {
  if (songIndex == 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  isPlaying ? PlaySong() : null;
  updateProgressBar();
});

//Button for switch forward song
$nextBtn.addEventListener('click', () => {
  if (songIndex == songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);
  isPlaying ? PlaySong() : null;
  updateProgressBar();
});

//Handle Click for select moment of timeline
$progressContainer.addEventListener('click', function (event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const { duration } = $music;
  $music.currentTime = (clickX / width) * duration;
});

//Render Progress Bar
$music.addEventListener('timeupdate', function (event) {
  if (isPlaying) {
    const { currentTime, duration } = event.srcElement;
    $progress.style.width = ((currentTime / duration) * 100).toFixed(2) + '%';
    // Calculate duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      $duration.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate current minutes & current seconds
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }

    $currentTime.textContent = `${currentMinutes}:${currentSeconds}`;
  }
});
