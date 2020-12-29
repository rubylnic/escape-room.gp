'use strict';
(function () {
  var section = document.querySelector('.questions');
  if (section) {
    var form = section.querySelector('form');
    var name = section.querySelector('[name=name]');
    var tel = section.querySelector('[name=tel]');
    var comment = section.querySelector('[name=comment]');
    var checkbox = section.querySelector('[name=checkbox]');

    var isStorageSupport = true;
    var storage = '';

    try {
      storage = localStorage.getItem('login');
    } catch (err) {
      isStorageSupport = false;
    }

    if (storage) {
      name.value = storage;
      tel.value = storage;
      comment.value = storage;
    }

    form.addEventListener('submit', function (evt) {
      if (!name.value || !tel.value || !checkbox.checked) {
        evt.preventDefault();
        checkbox.setCustomValidity('Согласны на обработку персональных данных?');
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', name.value);
          localStorage.setItem('tel', tel.value);
          localStorage.setItem('comment', comment.value);
        }
      }
    });
  }
})();

'use strict';
(function () {
  var btn = document.querySelector('.main-header__menu-button');
  var bg = document.querySelector('.background-container');
  var nav = document.querySelector('.main-nav');
  var main = document.querySelector('.main');
  var footer = document.querySelector('.footer');

  var js = function () {
    bg.classList.remove('background-container--opened');
    nav.classList.add('main-nav--closed');
    btn.classList.add('main-header__menu-button--closed');
    footer.classList.add('footer--closed');
    main.classList.remove('main--closed');
  };
  js();

  var openCloseMenu = function (evt) {
    evt.preventDefault();
    bg.classList.toggle('background-container--opened');
    nav.classList.toggle('main-nav--closed');
    btn.classList.toggle('main-header__menu-button--closed');
    footer.classList.toggle('footer--closed');
    main.classList.toggle('main--closed');
  };
  btn.addEventListener('click', openCloseMenu);
})();

'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var btnOpen = document.querySelector('.main-nav__link--location');
  var btnClose = document.querySelector('.modal-city__button-close');
  var html = document.querySelector('html');
  var modal = document.querySelector('.modal-city');
  var overlay = modal.querySelector('.modal-city__overlay');
  var modalContainer = modal.querySelector('.modal-city__container');

  var closeModal = function () {
    modal.classList.add('modal-city--closed');
    html.style.overflow = 'auto';
  };
  var openModal = function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal-city--closed');
    html.style.overflow = 'hidden';
  };
  var enterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openModal();
    }
  };
  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });
  document.addEventListener('keydown', escPressHandler);
  btnOpen.addEventListener('keydown', enterPressHandler);

})();

'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var btnOpen = document.querySelector('.footer__link');
  var btnClose = document.querySelector('.modal-question__button-close');
  var html = document.querySelector('html');
  var modal = document.querySelector('.modal-question');
  var overlay = modal.querySelector('.modal-question__overlay');
  var modalContainer = modal.querySelector('.modal-question__container');
  var submit = document.querySelector('.modal-question__form-container button');
  var errorMessage = document.querySelector('.modal-question__error-message');
  var errorMessageCheckbox = document.querySelector('.modal-question__error-message-checkbox');

  var form = modal.querySelector('form');
  var name = modal.querySelector('[name=modal-name]');
  var email = modal.querySelector('[name=modal-email]');
  var comment = modal.querySelector('[name=modal-comment]');
  var checkbox = modal.querySelector('[name=modal-checkbox]');

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('name');
  } catch (err) {
    isStorageSupport = false;
  }

  var closeModal = function () {
    modal.classList.add('modal-question--closed');
    modal.classList.remove('modal--error');
  };
  var openModal = function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal-question--closed');
    html.style.overflow = 'hidden';

    if (storage) {
      name.value = localStorage.getItem('name');;
      email.value = localStorage.getItem('email');;
      comment.value = localStorage.getItem('comment');;
    }

    name.focus();
  };
  var enterPressHandler = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openModal();
    }
  };
  var escPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  btnOpen.addEventListener('click', openModal);
  btnClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  modalContainer.addEventListener('click', function (evt) {
    evt.stopPropagation();
  });
  document.addEventListener('keydown', escPressHandler);
  btnOpen.addEventListener('keydown', enterPressHandler);

  var errorHandler = function () {
    var validity = email.checkValidity();
    if (validity === true) {
      errorMessage.classList.add('modal-question__error-message--hidden');
    } else {
      errorMessage.classList.remove('modal-question__error-message--hidden')
    }
  }

  var errorCheckboxHandler = function (evt) {
    if (!checkbox.checked) {
      evt.preventDefault();
      errorMessageCheckbox.classList.remove('modal-question__error-message-checkbox--hidden');
    } else {
      errorMessageCheckbox.classList.add('modal-question__error-message-checkbox--hidden')
    }
  }

  submit.addEventListener('click', errorHandler);
  submit.addEventListener('click', errorCheckboxHandler);

  form.addEventListener('submit', function (evt) {
    if (!name.value || !email.value) {
      evt.preventDefault();
      name.setCustomValidity('');
      email.setCustomValidity('');
    }
    else {
      if (isStorageSupport) {
        localStorage.setItem('name', name.value);
        localStorage.setItem('email', email.value);
        localStorage.setItem('comment', comment.value);
      }
    }
  });
})();
