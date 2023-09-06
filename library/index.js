// console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12')

// BURGER
function burger() {
  const burger = document?.querySelector('[data-burger]');
  const nav = document?.querySelector('[data-nav]');
  //changed
  const icon = document?.querySelector('[data-auth-icon]');
  const navItems = nav?.querySelectorAll('a');
  const body = document.body;

  burger?.addEventListener('click', () => {
    body.classList.toggle('stop-scroll');
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('nav--visible');
  });

  document.addEventListener('click', (e) => {
    if (e.target === nav || nav.contains(e.target) || e.target === burger) {
      return false;
    } else if (body.classList.contains('stop-scroll') || e.target === icon) {
      // ?????? || e.target === icon
      body.classList.remove('stop-scroll');
      burger?.classList.remove('burger--active');
      nav?.classList.remove('nav--visible');
      e.preventDefault(true);
    }
  });

  navItems.forEach(el => {
    el.addEventListener('click', () => {
      burger?.classList.remove('burger--active');
      nav?.classList.remove('nav--visible');
    });
  });
}
burger();


// SLIDER
function sliderFunction() {

  let slider = document.getElementById('About'),
    sliderLine = slider.querySelector('.section-about-container-img'),
    sliderItems = sliderLine.querySelectorAll('img'),
    prevButton = slider.querySelector('.carret-left'),
    nextButton = slider.querySelector('.carret-right'),
    currentSlide = 0,
    slidesCount = sliderItems.length,
    dotsContainer = slider.querySelector('.dots-container'),
    dotHtml = `<div class="carousel-clickable-area dot">
          <div class="carousel-inner-area inner-dot"></div>
      </div>`,
    activeDotClass = 'active';

  function initSlider() {



    // init dots
    let dotsHtml = '',
      slidesPerPage = Math.floor(slider.offsetWidth / sliderItems[0]?.offsetWidth) ?? 3;

    for (let i = 0; i < Math.ceil(slidesCount - slidesPerPage + 1); i++) {
      dotsHtml += dotHtml;
    }

    dotsContainer.innerHTML = dotsHtml;

    // init actions
    nextButton.addEventListener('click', nextSlide)
    prevButton.addEventListener('click', prevSlide)

    for (const [key, item] of Object.entries(dotsContainer.children)) {
      item.index = key;
      item.addEventListener('click', function (e) {
        setActiveSlide(this.index);
      })
    }

    setActiveSlide(0);
  }

  function nextSlide() {
    setActiveSlide(currentSlide === slidesCount - 1 ? currentSlide : currentSlide + 1);
  }
  function prevSlide() {
    setActiveSlide(currentSlide === 0 ? 0 : currentSlide - 1);
  }

  function setActiveSlide(index = 0) {
    index = +index;

    position = 475 * index;
    sliderLine.style.left = -position + 'px';

    if (index > 0) {
      prevButton.classList.remove('disabled');

      if (index === slidesCount - 1) {
        nextButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
      }
    } else {
      nextButton.classList.remove('disabled');
      prevButton.classList.add('disabled');
    }

    for (let [key, dot] of Object.entries(dotsContainer.children)) {

      if (key == index) {
        dot.classList.add(activeDotClass)
      } else {
        dot.classList.remove(activeDotClass);
      }
    }


    currentSlide = index;
  }

  initSlider();
  window.addEventListener('resize', initSlider);
}
setTimeout(sliderFunction, 500);


function Account() {

  let userData = {
    first_name: null, last_name: null, email: null, full_name: null,
    boughtBooks: {},
    is_bought_library_card: false, is_auth: false,
    visits: 0, card_number: null
  }
  /**
   * data-auth-{object_key}: html
   */
  let userDomDataMap = {
    '$readers-card-number': `userData.card_number`,
    '$user-full-name': `userData.full_name`,
    '$user-short-name': `'<div title="' + userData.full_name + '">' + (userData.first_name.charAt() + userData.last_name.charAt()).toUpperCase() + '</div>'`,
    'menu': `
        <button data-popup-button="profile-popup">
            <p class="login-dropdown">My profile</p>
        </button>
        <button onclick="localStorage.setItem('is_auth', false); location.reload()">
            <p class="login-dropdown">Log Out</p>
        </button>
      `,
    'find-card-title': 'Your Library card',
    'get-card': `<div class="get-card-title">Get a reader card</div>
      <div class="get-card-description">With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.</div>
      <div class="get-card-buttons">
          <button class="card-button" data-popup-button='profile-popup'>Profile</button>
      </div>
      `,
    '$bought-books-list': 'getBoughtBooksList()',
    '$readers-input-name': 'getReadersInputName()',
    '$readers-card-number-r': 'getReadersInputCardNumber()',
    '$bought-books-count': `Object.keys(userData.boughtBooks).length`,
    '$visits': `userData.visits`,
    '$readers-profile-block': `getUserProfileBlock()`,
  };

  function init() {
    loadUserData();

    if (isAuth()) {
      showUserData();
      initActions();

    } else if (isRegistered()) {
      document.getElementById('Favorites')?.querySelectorAll('.card-button')?.forEach(button => {
        button.setAttribute('data-popup-button', 'login-popup')
      });
    }
  }

  function isRegistered() {
    return localStorage.getItem('email') !== null;
  }

  function isAuth() {
    return userData.is_auth === true;
  }

  // load user data from local storage into the userData object
  function loadUserData() {

    userData.first_name = localStorage.getItem('first_name');
    userData.last_name = localStorage.getItem('last_name');
    userData.email = localStorage.getItem('email');
    userData.full_name = localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name');
    userData.is_bought_library_card = JSON.parse(localStorage.getItem('is_bought_library_card'));
    userData.is_auth = JSON.parse(localStorage.getItem('is_auth'));
    userData.visits = +localStorage.getItem('visits');
    userData.card_number = localStorage.getItem('card_number');



    try {
      let boughtBooksLocalStorageObject = JSON.parse(localStorage.getItem('boughtBooks'));

      if (boughtBooksLocalStorageObject !== null && typeof boughtBooksLocalStorageObject === 'object') {
        userData.boughtBooks = boughtBooksLocalStorageObject;
      }
    } catch { }
  }

  // write user data from userData object into the local storage
  function updateLocalStorage() {
    for (let [key, value] of Object.entries(userData)) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    }
  }

  function showUserData() {


    function getReadersInputName() {
      return isAuth() ?
        `<input class="form-input" type="text" placeholder="Reader's name" value="` + userData.full_name + `">` :
        '';
    }

    function getReadersInputCardNumber() {
      return isAuth() ?
        `<input class="form-input" type="text" placeholder="Reader's name" value="` + userData.card_number + `">` :
        '';
    }

    function getBoughtBooksList() {
      let resultHtmlList = '';

      for (let [key, value] of Object.entries(userData.boughtBooks)) {

        resultHtmlList += '<li>' + value.name + ', ' + value.author.slice(2) + '</li>'
        // <a data-book-id="' + key + '" href="#"></a>
      }


      return resultHtmlList;
    }

    function getUserProfileBlock() {
      const block = document.querySelector('[data-profile-block]');
      return block ? block.outerHTML : '';
    }

    // works with DataMap
    for (let [key, value] of Object.entries(userDomDataMap)) {
      if (key.includes('$')) {
        key = key.replace('$', '');
        value = eval(value);
      }

      document.querySelectorAll('[data-auth-' + key + ']')?.forEach(item => {
        item.innerHTML = value;
      })
      // document.getElementById('form-libr-card').querySelector('input').value = `${userData.first_name} ${userData.last_name}`;
      // console.log(document.querySelector('.icon-instead')).title = `${(userData.first_name.charAt() + userData.last_name.charAt()).toUpperCase()}`
    }

    // works with books 
    let allBuyButtons = document.getElementById('Favorites')?.querySelectorAll('.card-button');
    for (let [key, value] of Object.entries(userData.boughtBooks)) {
      let button = allBuyButtons.item(key);

      button.innerHTML = 'Own';
      button.classList.add('disabled');
    }
  }

  function initActions() {

    function copyToClipboard() {
      const textToCopy = document.querySelector('[data-auth-readers-card-number]');
      document.getElementById('copyToClBtn').addEventListener('click', () => {
        navigator.clipboard.writeText(textToCopy.innerHTML).then(function () {
          alert('Текст успешно скопирован в буфер обмена');
        }, function (err) {
          console.error('Произошла ошибка при копировании текста: ', err);
        });
      })
    }
    copyToClipboard()

    let allBuyButtons = document.getElementById('Favorites')?.querySelectorAll('.card-button');

    // document.querySelector('[data-auth-bought-books-list]').addEventListener('click', (e) => {
    //   const clickedElement = e.target;
    //   if (clickedElement.tagName === 'a' && clickedElement.hasAttribute('data-book-id')) {
    //     deleteBook(+clickedElement.getAttribute('data-book-id'));
    //     e.preventDefault();
    //   }
    // })

    if (userData.is_bought_library_card === true) {

      allBuyButtons.forEach((button, index) => {
        let bookContainer = button.parentElement,
          bookData = {
            name: bookContainer.querySelector('[data-book-name]')?.innerHTML,
            author: bookContainer.querySelector('[data-book-author]')?.innerHTML
          };
        button.addEventListener('click', addBook.bind(this, bookData, index))
      })

    } else {

      allBuyButtons.forEach(button => {
        button.setAttribute('data-popup-button', 'buy-library-card-popup')
      });

    }

    // init library cart form
    const formByLibraryCard = document.getElementById('form-buy-library-card');
    const byCardSubmitBtn = document.getElementById('buy-library-card-submit-btn')



    byCardSubmitBtn.addEventListener('mouseover', (e) => {
      e.preventDefault()
      if (formByLibraryCard.checkValidity()) {
        byCardSubmitBtn.classList.remove('by-card-btn')
        byCardSubmitBtn.classList.add('card-button')
      }
    })


    formByLibraryCard.addEventListener('submit', (e) => {
      e.preventDefault()
      userData.is_bought_library_card = true;
      updateLocalStorage();
      location.reload();
    })


    // document.getElementById('change-name').addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   if (e.target.first_name && e.target.first_name?.value === '') {
    //     return
    //   }

    //   userData.first_name = e.target.first_name.value;
    //   showUserData();

    // })

    /// name changer
    /// 1. add event listener
    /// 2. get form data 
    /// 3. update userData object
    /// 4. Sync data with storage
    /// 5. Update user data on the page


  }

  function addBook(bookData, id) {
    // 1. add the book into the userData object
    // 2. update local storage variable according to the userData object
    // 3. update view stage
    userData.boughtBooks[id] = bookData;
    updateLocalStorage();
    showUserData();
  }



  init();
}

Account();



// FAVORITES
/*стили в style.css находятся после строки - "СКРЫТИЕ И ПОЯВЛЕНИЕ КНИГ ПО СЕЗОНАМ" */
const booksContainer = document.getElementById('books-container'),
  categoryFilter = document.getElementById('books-category');

categoryFilter.addEventListener('change', () => {
  booksContainer.setAttribute('data-current', categoryFilter.season.value);
});




//  FORM REGISTER
let visits = +localStorage.getItem('visits');
const formRegistration = document.getElementById('form-registration')
const formRegistrationFields = formRegistration.elements

formRegistration.addEventListener('submit', (e) => {
  e.preventDefault();
  if (formRegistration.checkValidity()) {
    for (let i = 0; i < formRegistrationFields.length; i++) {
      localStorage.setItem(formRegistrationFields[i].name, formRegistrationFields[i].value)
    }
    localStorage.setItem('is_auth', true);
    localStorage.setItem('visits', ++visits)
    localStorage.setItem('card_number', generateCardNumber())


  }
})

function generateCardNumber() {
  const min = 0x100000000;
  const max = 0xfffffffff;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber.toString(16).toLocaleUpperCase();
}

// FORM LOGIN
const formLogin = document.getElementById('form-login')
const formLoginFields = formLogin.elements

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  if (formLogin.checkValidity()) {
    if ((formLoginFields[0].value == localStorage.getItem('email') || formLoginFields[0].value == localStorage.getItem('card_number')) && formLoginFields[1].value == localStorage.getItem('password')) {
      localStorage.setItem('is_auth', true);
      localStorage.setItem('visits', ++visits)
      location.reload();
    } else {
      alert('Невернно введены логин или пароль')
    }
  }
}
)



// POPUPS
function popUps() {
  const popupAttributeName = 'data-popup',
    popupButtonAttributeName = 'data-popup-button',
    popupCloseButtonAttributeName = 'data-popup-close',
    activePopupClass = 'opened';

  document.addEventListener('click', (e) => {

    // if this element or the parent one is Button Close
    if (e.target.closest('[' + popupCloseButtonAttributeName + ']')) {
      closeAllPopups();
      return;
    }

    // if this element or the parent one is Button Open 
    let popupButtonOpen = e.target.closest('[' + popupButtonAttributeName + ']');

    if (popupButtonOpen) {
      let popup_id = popupButtonOpen.getAttribute(popupButtonAttributeName),
        popup = document.getElementById(popup_id);

      if (!popup) {
        return;
        // чтоб закрывалось при нажатии на иконку
      } else if (popup.classList.contains(activePopupClass)) {
        closeAllPopups();
        return;
      }

      openPopup(popup);
      e.stopImmediatePropagation();

      return;
    }

    // if e.target is the Parent container of the popup
    let isPopupParent = e.target?.hasAttribute(popupAttributeName),
      isPopupChild = e.target.closest('[' + popupAttributeName + ']');
    if (!isPopupParent && isPopupChild) {
      return;
    }

    closeAllPopups();
  })

  function openPopup(popup) {
    closeAllPopups();
    popup.classList.add(activePopupClass);
  };

  function closeAllPopups() {
    document.querySelectorAll('[' + popupAttributeName + ']').forEach(item => {
      item.classList.remove(activePopupClass);
    });
  };

}
popUps();