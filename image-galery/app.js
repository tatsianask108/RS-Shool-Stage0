const accessKey = 'OMwDIAQF0FYjBA8pqbedHJKqu15CX64ALK8k51BG2Hk';

const inputEl = document.getElementById('input')
const imgContainer = document.getElementById('img-container');
const imgContainerWrapper = document.querySelector('.img-container-wrapper')
const text = document.querySelector('.text')
const form = document.querySelector('.search-bar')
const cross = document.getElementById('cross')
let inputData = ''


// ???
// window.onload = getData('image')
// любая асинхронная ф-ция возвращает промис
async function getData(inputData) {
    try {
        inputData = inputEl.value
        // console.log(inputData)
        if (!inputData) {
            inputData = 'image'
        }
        const url = `https://api.unsplash.com/search/photos?query=${inputData}&per_page=12&client_id=${accessKey}`
        const response = await fetch(url);
        const gotData = await response.json();
        // console.log(gotData)

        showData(gotData)
    } catch (error) {
        console.warn(error)
        return error
    }

}
getData(inputData);
// нужно ли вызывать?

function showData(data) {
    if (data.results.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.classList.add('textDiv')
        emptyDiv.innerHTML = `No images found :(`
        imgContainer.append(emptyDiv);
    } else {
        imgContainerWrapper.prepend(text)
        data.results.forEach((el) => {
            const divForImg = document.createElement('div')
            divForImg.classList.add('divUploadedImg')
            divForImg.innerHTML = `<a href="${el.urls.full}" target="_blank"><img src="${el.urls.regular}" title="${el.alt_description}" class="gotImg"></a>`
            imgContainer.append(divForImg);
        })
    }
}



form.addEventListener('submit', (e) => {
    e.preventDefault()
    text.remove()
    imgContainer.innerHTML = ''
    getData(inputData)
    // и тут вызывать?
})

cross.addEventListener('click', () => {
    inputEl.value = ''
})

