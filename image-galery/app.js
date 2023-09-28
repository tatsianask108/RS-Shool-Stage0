const accessKey = 'OMwDIAQF0FYjBA8pqbedHJKqu15CX64ALK8k51BG2Hk';

const inputEl = document.getElementById('input')
const imgContainer = document.getElementById('img-container');
const form = document.querySelector('.search-bar')
const cross = document.getElementById('cross')
let inputData
// inputData = inputEl.value


// ???
// window.onload = getData('image')

async function getData(inputData) {
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?query=${inputData}&per_page=9&client_id=${accessKey}`
    const result = await fetch(url);
    const data = await result.json();
    console.log(data.results);
    // let photos = data.result
    data.results.forEach((el) => {
        const divForImg = document.createElement('div')
        divForImg.classList.add('divUploadedImg')
        divForImg.innerHTML = `<img src="${el.urls.regular}" alt="" class="gotImg">`
        // divForImg.style.backgroundImage = el.urls.regular
        // img.alt = `image`;
        // console.log(el.urls.regular);
        console.log(inputEl.value);
        imgContainer.append(divForImg);
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

