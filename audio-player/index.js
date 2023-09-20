const player = document.querySelector('.player'),
    playButton = document.querySelector('.play'),
    prevButton = document.querySelector('.prev'),
    nextButton = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    songName = document.querySelector('.song-name')
progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    coverImg = document.querySelector('.cover__img'),
    imgSrc = document.querySelector('.img__src'),
    background = document.querySelector('.background')

//song names
const songs = ['Beyonce', 'Dua Lipa']

// default song
let songIndex = 0

//initialization
function loadSong(song) {
    songName.innerHTML = song
    audio.src = `assets/audio/${song}.mp3`
    coverImg.src = `assets/img/cover${songIndex + 1}.png`
    background.src = `assets/img/cover${songIndex + 1}.png`
}

loadSong(songs[songIndex])

//play song
function playSong() {
    player.classList.add('play')
    imgSrc.src = `assets/svg/pause.png`
    audio.play()
}

//pause song
function pauseSong() {
    player.classList.remove('play')
    imgSrc.src = `assets/svg/play.png`
    audio.pause()
}

playButton.addEventListener('click', () => {
    let isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})
