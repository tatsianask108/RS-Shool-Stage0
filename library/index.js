// console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +26\n2. Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12\n3. На ширине экрана 768рх реализовано адаптивное меню +12')

// BURGER
function burger() {
  const burger = document?.querySelector('[data-burger]');
  const nav = document?.querySelector('[data-nav]');
  const navItems = nav?.querySelectorAll('a');
  const body = document.body;

  burger?.addEventListener('click', () => {
    body.classList.toggle('stop-scroll');
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('nav--visible');
  });

  document.addEventListener('click', (e) => {
      if(e.target === nav || nav.contains(e.target) || e.target === burger) {
        return false;
      } else if (body.classList.contains('stop-scroll')) {
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
            slidesPerPage = Math.floor(slider.offsetWidth / sliderItems[0]?.offsetWidth)?? 3;
            
        for (let i = 0; i < Math.ceil(slidesCount - slidesPerPage + 1); i++) {
          dotsHtml += dotHtml;
        }

        dotsContainer.innerHTML = dotsHtml;

        // init actions
        nextButton.addEventListener('click', nextSlide)
        prevButton.addEventListener('click', prevSlide)

        for (const [key, item] of Object.entries(dotsContainer.children)) {
          item.index = key;
          item.addEventListener('click', function(e) {
            setActiveSlide(this.index);
          })
        }
        
        setActiveSlide(0);
      }

      function nextSlide() {
        setActiveSlide(currentSlide === slidesCount - 1? currentSlide : currentSlide + 1);
      }
      function prevSlide() {
        setActiveSlide(currentSlide === 0? 0 : currentSlide - 1);
      }

      function setActiveSlide(index = 0) {
        index = +index;

        position = 475 * index;
        sliderLine.style.left = -position + 'px';

        if(index > 0) {
          prevButton.classList.remove('disabled');

          if(index === slidesCount - 1) {
            nextButton.classList.add('disabled');
          } else {
            nextButton.classList.remove('disabled');
          }
        } else {
          nextButton.classList.remove('disabled');
          prevButton.classList.add('disabled');
        }

        for (let [key, dot] of Object.entries(dotsContainer.children)) {
    
          if(key == index) {
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

  var userData = {
      first_name: null, last_name: null, email: null
    },
    /**
     * data-auth-{object_key}: html
     */
    userDomDataMap = {
      '$user-name': 'userData.first_name',
      '$user-full-name': `userData.first_name + ' ' + userData.last_name`,
      '$user-short-name': `(userData.first_name.charAt() + userData.last_name.charAt()).toUpperCase()`,
      //'$user-short-name': 'functionName()',
      'menu': `
        <button data-popup-button="profile-popup">
            <p class="login-dropdown">My profile</p>
        </button>
        <button onclick="localStorage.setItem('isAuth', false); location.reload()">
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
      // '$readers-name': `document.querySelector('[data-auth-readers-name]').setAttribute('value', 'user-full-name')`
    };

    function functionName() {return "any data"}

    function init() {      
      if(auth()) {
        showUserData();
        initUserActions();
      }
    }

    function auth() {
      if(localStorage.getItem('isAuth') === 'true') {
        userData = {
          first_name: localStorage.getItem('userFirstName'),
          last_name: localStorage.getItem('userLastName'),
          email: localStorage.getItem('userEmail'),
        };
        return true;
      }
      return false;
    }
    function showUserData() {
      for (let [key, value] of Object.entries(userDomDataMap)) {
        if(key.includes('$')) {
          key = key.replace('$', '');
          value = eval(value);
        }

        document.querySelectorAll('[data-auth-' + key + ']')?.forEach(item => {
          item.innerHTML = value;
        })
      }
    }
  

    // changed
    function initUserActions() {
      let allBooks = document.getElementById('Favorites')
      console.log(allBooks)
      let allBuyButtons = allBooks.querySelectorAll('.card-button')
      console.log(allBuyButtons)
      allBuyButtons.forEach(button => {
        button.setAttribute('data-popup-button', 'buy-library-card-popup')
    });
  }
    init();
}

Account();



// FAVORITES
const booksContainer = document.getElementById('books-container'),
        categoryFilter = document.getElementById('books-category');

categoryFilter.addEventListener('change', function (e) {
  booksContainer.setAttribute('data-current', categoryFilter.season.value);
});


//  FORM REGISTER
const formRegistration = document.getElementById('form-registration')
const formRegistrationFields = formRegistration.elements

console.log(formRegistrationFields)

formRegistration.addEventListener('submit', (e) => {
  if(formRegistration.checkValidity()) {
    for (let i = 0; i < formRegistrationFields.length; i++) {
      localStorage.setItem(formRegistrationFields[i].name, formRegistrationFields[i].value)
    }
    localStorage.setItem('isAuth', true); 
    // localStorage.setItem('isRegistered', true); 

  }
})

// FORM LOGIN
// changed
const formLogin = document.getElementById('form-login')
const formLoginFields = formLogin.elements

console.log(formLoginFields)
formLogin.addEventListener('submit', (e) => {
  if(formLogin.checkValidity()) {
    if (formLoginFields[0].name == localStorage.getItem('userEmail') && formLoginFields[1].name == localStorage.getItem('userPassword')) {
      // localStorage.setItem('isAuth', true); 
      // ?????
      // Account();
    }
  }
})


// POPUPS
function popUps() {
  let popupAttributeName = 'data-popup',
    popupButtonAttributeName = 'data-popup-button',
    popupCloseButtonAttributeName = 'data-popup-close',
    activePopupClass = 'opened';

    document.querySelectorAll('[' + popupButtonAttributeName + ']').forEach((button) => {
      let popup_id = button.getAttribute(popupButtonAttributeName),
        popup = document.getElementById(popup_id);

        if(!popup) {
          return;
        }

        button.addEventListener('click', (e) => {
          openPopup(popup);
          e.stopImmediatePropagation();
        });
        popup.querySelector('[' + popupCloseButtonAttributeName + ']')?.addEventListener('click', closeAllPopups);

    })

    document.addEventListener('click', (e) => {
      let isPopupParent = e.target?.hasAttribute(popupAttributeName),
        isPopupChild = e.target.closest('[' + popupAttributeName + ']');

      if(!isPopupParent && isPopupChild) {
        return false;
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