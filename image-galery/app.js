const accessKey = 'OMwDIAQF0FYjBA8pqbedHJKqu15CX64ALK8k51BG2Hk';

const form = document.getElementById('search-form'),
    inputEl = form.querySelector('input[name=search]'),
    cross = form.querySelector('[data-action=cross]');

const imgContainer = document.getElementById('img-container'),
    prompt = imgContainer.querySelector('[data-role=prompt]'),
    resultContainer = imgContainer.querySelector('[data-role=result]');

// любая асинхронная ф-ция возвращает промис
async function getData(query) {
    try {
        // console.log(inputData)
        if (!query) {
            query = 'image'
        }
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`
        const response = await fetch(url);
        const data = await response.json();
        // console.log(gotData)

        return data;
    } catch (error) {
        console.warn(error)
        return {}
    }

}

function renderData(data) {
    resultContainer.innerHTML = '';

    if (data.results.length === 0) {
        const emptyDiv = document.createElement('div')
        emptyDiv.classList.add('textDiv')
        emptyDiv.innerHTML = `No images found :(`
        resultContainer.append(emptyDiv);
    } else {
        imgContainer.prepend(prompt)
        data.results.forEach((el) => {
            const divForImg = document.createElement('div')
            divForImg.classList.add('divUploadedImg')
            divForImg.innerHTML = `<a href="${el.urls.full}" target="_blank"><img src="${el.urls.regular}" title="${el.alt_description}" class="gotImg"></a>`
            resultContainer.append(divForImg);
        })
    }
}


async function showDataFor(search_string) {
    const data = await getData(search_string);
    return renderData(data);
}

window.addEventListener('DOMContentLoaded', showDataFor.bind(this, 'image'));


form.addEventListener('submit', (e) => {
    e.preventDefault()
    prompt.remove()
    resultContainer.innerHTML = 'Loading ...'
    showDataFor(inputEl.value)

})

cross.addEventListener('click', () => {
    inputEl.value = ''
})

