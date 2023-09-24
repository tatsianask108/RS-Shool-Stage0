console.log('1.Вёрстка +10\n2.Кнопка Play/Pause +10\n3.При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10\n4.При смене аудиотрека меняется изображение - обложка аудиотрека +10\n5.Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10\n6.Отображается продолжительность аудиотрека и его текущее время проигрывания +10')

const audio = document.querySelector('.audio'),
    player = document.querySelector('#player'),
    playBtn = document.querySelector('.play'),
    prevButton = document.querySelector('.prev'),
    // my own context using player instead of document
    nextButton = player.querySelector('.next'),
    artistName = player.querySelector('.artist-name'),
    songName = player.querySelector('.song-name'),
    // progressContainer = document.querySelector('.progress__container'),
    // progress = document.querySelector('.progress'),
    progressBar = document.querySelector('.progress-bar'),
    currentTimeSong = document.querySelector('.current-time'),
    songDuration = document.querySelector('.song-duration'),
    coverImg = document.querySelector('.cover__img'),
    imgSrc = document.querySelector('.img__src'),
    background = document.querySelector('.background')



const songs = [
    {
        artist: 'Oaasis',
        name: 'Silent Wood',
        path: 'assets/audio/Oaasis - Silent Wood.mp3',
        cover: 'assets/img/cover1.jpg',
    },
    {
        artist: 'LO-FI LE-VI',
        name: 'You',
        path: 'assets/audio/LO-FI LE-VI - You.mp3',
        cover: 'assets/img/cover2.jpg',
    },
    {
        artist: 'Barradeen',
        name: 'The girl I haven\'t met',
        path: 'assets/audio/Barradeen - The girl I haven\'t met.mp3',
        cover: 'assets/img/cover3.jpg',
    },
    {
        artist: 'Extenz',
        name: 'Life',
        path: 'assets/audio/Extenz - Life.mp3',
        cover: 'assets/img/cover4.jpg',
    },

]

// default song
let songIndex = 0,
    isPlay = false,
    songProgressInterval

//formatting time to minutes and seconds
function formatTime(time) {
    let min = Math.floor(time / 60)
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`
}

//initialization
function loadSong(song) {
    artistName.innerHTML = song.artist
    songName.innerHTML = song.name
    audio.src = song.path
    coverImg.src = song.cover
    background.src = song.cover
    currentTimeSong.innerHTML = '00:00'
    audio.addEventListener("loadedmetadata", () => {
        songDuration.innerHTML = formatTime(audio.duration)
        progressBar.max = audio.duration
    })
    clearInterval(songProgressInterval)

}

loadSong(songs[songIndex])

//play song
function playAudio() {
    // player.classList.add('play')

    // visually change progress-bar
    songProgressInterval = setInterval(() => {
        progressBar.value = audio.currentTime
        currentTimeSong.innerHTML = formatTime(audio.currentTime)
    }, 500)

    isPlay = true
    imgSrc.src = `assets/svg/pause.png`
    audio.play()
}

//pause song
function pauseAudio() {
    // player.classList.remove('play')

    clearInterval(songProgressInterval)

    isPlay = false
    imgSrc.src = `assets/svg/play.png`
    audio.pause()
}


playBtn.addEventListener('click', () => {
    // let isPlaying = player.classList.contains('play')
    if (isPlay) {
        pauseAudio()
    } else {
        playAudio()
    }
})

//next song 
function playNext() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playAudio()
}

nextButton.addEventListener('click', () => {
    playNext()
})

//previous song 
function playPrev() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playAudio()
}

prevButton.addEventListener('click', () => {
    playPrev()
})

//change progress bar by clicking on it
progressBar.addEventListener('change', () => {
    audio.currentTime = progressBar.value
})

//autoplay
audio.addEventListener('ended', playNext)


// //progress bar done with div
// function updateProgress() {
//     let currentTime = audio.currentTime
//     currentTimeSong.innerHTML = formatTime(currentTime)
//     const duration = audio.duration
//     const progressPercents = (currentTime / duration) * 100
//     progress.style.width = `${progressPercents}%`
// }
// audio.addEventListener('timeupdate', updateProgress)

// //change progress bar by click
// function changeProgress(e) {
//     const progressBarWidth = this.clientWidth
//     const clickTarget = e.offsetX
//     const duration = audio.duration

//     audio.currentTime = clickTarget / progressBarWidth * duration
// }

// progressContainer.addEventListener('click', changeProgress)