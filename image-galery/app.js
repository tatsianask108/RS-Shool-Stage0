const accessKey = 'OMwDIAQF0FYjBA8pqbedHJKqu15CX64ALK8k51BG2Hk';

const inputEl = document.getElementById('input')
const imgContainer = document.getElementById('img-container');
const form = document.querySelector('.search-bar')
const cross = document.getElementById('cross')
let inputData = ''


// ???
// window.onload = getData('image')

async function getData(inputData) {
    inputData = inputEl.value
    console.log(inputData)
    if (!inputData) {
        inputData = 'image'
    }
    const url = `https://api.unsplash.com/search/photos?query=${inputData}&per_page=9&client_id=${accessKey}`
    const result = await fetch(url);
    const data = await result.json();
    console.log(data)
    if (data.results.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.classList.add('textDiv')
        emptyDiv.innerHTML = `No images found :(`
        imgContainer.append(emptyDiv);
    } else data.results.forEach((el) => {
        const divForImg = document.createElement('div')
        divForImg.classList.add('divUploadedImg')
        divForImg.innerHTML = `<img src="${el.urls.regular}" title="${el.alt_description}" class="gotImg">`
        imgContainer.append(divForImg);
        // divForImg.onclick()
    })
}
getData(inputData);
// нужно ли вызывать?



form.addEventListener('submit', (e) => {
    e.preventDefault()
    imgContainer.innerHTML = ''
    getData(inputData)
    // и тут вызывать?
})

cross.addEventListener('click', () => {
    inputEl.value = ''
})

