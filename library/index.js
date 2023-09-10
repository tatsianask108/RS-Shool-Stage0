console.log('Этап1. +50\nЭтап2. +49\nЭтап3. +29\nЭтап4. +76')

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
    first_name: '', last_name: '', email: '', full_name: '',
    boughtBooks: {},
    is_bought_library_card: false, is_auth: false,
    visits: 0, card_number: ''
  },
    localstorage_prefix = 'tatsianask_108_';
  /**
   * data-auth-{object_key}: html
   */
  let userDomDataMap = {
    '$readers-card-number': `userData.card_number`,
    '$user-full-name': `userData.full_name`,
    // '$user-short-name': `'<div title="' + userData.full_name + '">' + (userData.first_name.charAt() + userData.last_name.charAt()).toUpperCase() + '</div>'`,
    '$user-short-name': 'getUserShortName()',
    'menu': `
        <button data-popup-button="profile-popup">
            <p class="login-dropdown">My profile</p>
        </button>
        <button onclick="localStorage.setItem('tatsianask_108_is_auth', false); location.reload()">
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
    '$readers-input-card-number': 'getReadersInputCardNumber()',
    '$bought-books-count': `Object.keys(userData.boughtBooks).length`,
    '$visits': `userData.visits`,
    '$readers-profile-block': `getUserProfileBlock()`,
  };

  function init() {
    loadUserDataFromLocalStorage();

    if (isAuth()) {
      showUserData();
      initActions();
    } else if (isRegistered()) {
      showInfoFor10Sec();
      document.getElementById('Favorites')?.querySelectorAll('.card-button')?.forEach(button => {
        button.setAttribute('data-popup-button', 'login-popup')
      });
    }


    function showInfoFor10Sec() {
      let form = document.getElementById('form-libr-card');
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        if ((form.elements[0].value === localStorage.getItem('tatsianask_108_full_name') && form.elements[1].value === localStorage.getItem('tatsianask_108_card_number'))
          || (form.elements[0].value === localStorage.getItem('tatsianask_108_first_name') && form.elements[1].value === localStorage.getItem('tatsianask_108_card_number'))) {
          const block = document.querySelector('[data-profile-block]');
          const container = document.querySelector('.card-profile-block-container');
          block.firstElementChild.lastElementChild.innerHTML = userData.visits
          block.lastElementChild.lastElementChild.innerHTML = Object.keys(userData.boughtBooks).length

          container.innerHTML = block.outerHTML;
          setTimeout(function () {
            location.reload();
          }, 10000);
        }
      })
    }

  }


  function isRegistered() {
    return userData.email;
  }

  function isAuth() {
    return userData.is_auth === true;
  }

  // write user data from userData object into the local storage
  function updateLocalStorage() {
    for (let [key, value] of Object.entries(userData)) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(localstorage_prefix + key, value);
    }
  }

  // load user data from the local storage
  function loadUserDataFromLocalStorage() {
    for (let [key, value] of Object.entries(userData)) {
      let local_storage_value = localStorage.getItem(localstorage_prefix + key);

      if (!local_storage_value) {
        continue;
      }

      if (['object', 'boolean'].includes(typeof value)) {
        try {
          local_storage_value = JSON.parse(local_storage_value);
        } catch { }
      }

      userData[key] = local_storage_value;
    }

    if (userData.first_name && userData.last_name) {
      userData.full_name = userData.first_name + ' ' + userData.last_name;
    }
  }


  function showUserData() {
    // works with DataMap
    for (let [key, value] of Object.entries(userDomDataMap)) {
      if (key.includes('$')) {
        key = key.replace('$', '');
        value = eval(value);
      }

      document.querySelectorAll('[data-auth-' + key + ']')?.forEach(item => {
        item.innerHTML = value;
      })
    }

    function getUserShortName() {
      return isAuth() ?
        `<div title="${userData.full_name}">${userData.first_name.charAt().toUpperCase()}${userData.last_name.charAt().toUpperCase()}</div>` :
        '';
    }

    function getReadersInputName() {
      return isAuth() ?
        `<input class="form-input" type="text" placeholder="Reader's name" value="${userData.full_name}">` :
        '';
    }

    function getReadersInputCardNumber() {
      return isAuth() ?
        `<input class="form-input" type="text" placeholder="Reader's name" value="${userData.card_number}">` :
        '';
    }

    function getUserProfileBlock() {
      const block = document.querySelector('[data-profile-block]');
      return block ? block.outerHTML : '';
    }

    function getBoughtBooksList() {
      let resultHtmlList = '';

      for (let [key, value] of Object.entries(userData.boughtBooks)) {
        // resultHtmlList += '<li>' + value.name + ', ' + value.author.slice(2) + '</li>'
        resultHtmlList += `<li> ${value.name}, ${value.author.slice(2)}</li>`
      }
      return resultHtmlList;
    }


    // works with books 
    let allBuyButtons = document.getElementById('Favorites')?.querySelectorAll('.card-button');
    for (let [key, value] of Object.entries(userData.boughtBooks)) {
      let button = allBuyButtons[key];
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

    byCardSubmitBtn.addEventListener('mouseover', () => {
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
  }

  function addBook(bookInfo, id) {
    // 1. add the book into the userData object
    // 2. update local storage according to the userData object
    // 3. update view state
    userData.boughtBooks[id] = bookInfo;
    updateLocalStorage();
    showUserData();
  }

  init();
}

Account();



//  FORM REGISTER
let visits = +localStorage.getItem('tatsianask_108_visits');
const formRegistration = document.getElementById('form-registration')
const formRegistrationFields = formRegistration.elements

formRegistration.addEventListener('submit', (e) => {
  e.preventDefault();

  for (let i = 0; i < formRegistrationFields.length; i++) {
    localStorage.setItem(formRegistrationFields[i].name, formRegistrationFields[i].value)
  }
  localStorage.setItem('tatsianask_108_is_auth', true);
  localStorage.setItem('tatsianask_108_visits', ++visits)
  localStorage.setItem('tatsianask_108_card_number', generateCardNumber())
  location.reload();

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
    if ((formLoginFields[0].value == localStorage.getItem('tatsianask_108_email') || formLoginFields[0].value == localStorage.getItem('tatsianask_108_card_number')) && formLoginFields[1].value == localStorage.getItem('tatsianask_108_password')) {
      localStorage.setItem('tatsianask_108_is_auth', true);
      localStorage.setItem('tatsianask_108_visits', ++visits)
      location.reload();
    } else {
      alert('Невернно введен логин или пароль')
    }
  }
}
)


// FAVORITES
/*стили в style.css находятся после строки - "СКРЫТИЕ И ПОЯВЛЕНИЕ КНИГ ПО СЕЗОНАМ" */
const booksContainer = document.getElementById('books-container'),
  categoryFilter = document.getElementById('books-category');

categoryFilter.addEventListener('change', () => {
  booksContainer.setAttribute('data-current', categoryFilter.season.value);
});




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


    //   function showProfileInfoFor10Sec() {}
    // let timeoutId = window.setTimeout(showProfileInfoFor10Sec, 1000);
    // clearTimeout(timeoutId * 10)