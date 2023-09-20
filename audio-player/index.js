const audio = document.querySelector('.audio'),
    player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    prevButton = document.querySelector('.prev'),
    nextButton = document.querySelector('.next'),
    artistName = document.querySelector('.artist-name')
songName = document.querySelector('.song-name')
progressContainer = document.querySelector('.progress__container'),
    progress = document.querySelector('.progress'),
    currentTimeSong = document.querySelector('.current-time'),
    songDuration = document.querySelector('.song-duration'),
    coverImg = document.querySelector('.cover__img'),
    imgSrc = document.querySelector('.img__src'),
    background = document.querySelector('.background')

//song names
const songs = [
    {
        artist: 'LO-FI LE-VI',
        name: 'You',
        path: 'assets/audio/LO-FI LE-VI - You.mp3',
        cover: 'assets/img/cover1.jpg',
    },
    {
        artist: 'Barradeen',
        name: 'The girl I haven\'t met',
        path: 'assets/audio/Barradeen - The girl I haven\'t met.mp3',
        cover: 'assets/img/cover2.jpg',
    },
    {
        artist: 'Extenz',
        name: 'Life',
        path: 'assets/audio/Extenz - Life.mp3',
        cover: 'assets/img/cover3.jpg',
    }

]

// default song
let songIndex = 0


//initialization
function loadSong(song) {
    artistName.innerHTML = song.artist
    songName.innerHTML = song.name
    audio.src = `${song.path}`
    coverImg.src = `assets/img/cover${songIndex + 1}.jpg`
    background.src = `assets/img/cover${songIndex + 1}.jpg`
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

playBtn.addEventListener('click', () => {
    let isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//next song 
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

nextButton.addEventListener('click', () => {
    nextSong()
})

//previous song 
function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

prevButton.addEventListener('click', () => {
    prevSong()
})

//progress bar
function updateProgress() {
    currentTimeSong.innerHTML = Math.round(audio.currentTime)
    songDuration.innerHTML = audio.duration
    let currentTime = audio.currentTime
    const duration = audio.duration
    const progressPercents = (currentTime / duration) * 100
    progress.style.width = `${progressPercents}%`
}
audio.addEventListener('timeupdate', updateProgress)

//change progress bar by click
function changeProgress(e) {
    const progressBarWidth = this.clientWidth
    const clickTarget = e.offsetX
    const duration = audio.duration

    audio.currentTime = clickTarget / progressBarWidth * duration
}

progressContainer.addEventListener('click', changeProgress)

//autoplay
audio.addEventListener('ended', nextSong)