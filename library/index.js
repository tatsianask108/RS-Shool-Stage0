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
      let isPopup = e.target?.getAttribute(popupAttributeName)? true: false;

      if(isPopup || e.target.closest('[' + popupAttributeName + ']')) {
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

// MODALS
    document.querySelectorAll('[data-popup-button="registration-popup"]').forEach((button) => {
      button.addEventListener('click', () => {
        document.getElementById('my-modal').classList.add('opened')
      })
    })



// document.getElementById('open-modal-btn').addEventListener('click', () => {
//   document.getElementById('my-modal').classList.add('opened')
// })

document.getElementById('close-modal-btn').addEventListener('click', () => {
  document.getElementById('my-modal').classList.remove('opened')
})

document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
event._isClickWithinModal = true;
});

document.getElementById('my-modal').addEventListener('click', event => {
  if(event._isClickWithinModal) return;
  event.currentTarget.classList.remove('opened')
} )




// FAVORITES
const booksContainer = document.getElementById('books-container'),
        categoryFilter = document.getElementById('books-category');

categoryFilter.addEventListener('change', function (e) {
  booksContainer.setAttribute('data-current', categoryFilter.season.value);
});
