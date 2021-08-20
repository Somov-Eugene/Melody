$(document).ready(function () {
  let currentFloor = 2; // текущий этаж
  const floorPath = $(".home-image path"); // каждый отдельный этаж в SVG
  const counterUp = $(".counter-up"); // кнопка увеличения этажа
  const counterDown = $(".counter-down"); // кнопка уменьшения этажа

  const modal = $(".modal"); // модальное окно
  const modalCloseButton = $(".modal-close-button"); // кнопка закрытия модального окна
  const viewFlatsButton = $(".view-flats"); // кнопка "Смотреть квартиры на этаже"

  let currentFlat = 1; // текущая квартира на этаже
  const flatsPath = $(".flats path"); // каждая отдельная квартира на этаже в SVG
  const flatsLink = $(".flat-link"); // ссылки на квартиры на поэтажном плане

  /**
   * Отображаем счетчик этажей и подсвечиваем этаж на изображении
   * @param {integer} currentFloor  текущий этаж
   */
  const showCounter = function (currentFloor) {
    // форматируем строку, добавляя лидирующий ноль для значений, меньших 10
    usCurrentFloor = currentFloor.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    $(".counter").text(usCurrentFloor); // записываем значение этажа в счётчик

    floorPath.removeClass("current-floor"); // удаляем активный класс у этажей
    $(`[data-floor=${usCurrentFloor}]`).toggleClass("current-floor"); // подсвечиваем текущий этаж
  };

  /**
   * Подсвечиваем квартиру на изображении на поэтажном плане квартир (модальное окно)
   * @param {integer} currentFlat  текущая квартира
   */
  const showFlat = function (currentFlat) {
    flatsPath.removeClass("current-flat"); // удаляем активный класс у квартир на изображении
    $(`[data-flat=${currentFlat}]`).toggleClass("current-flat"); // подсвечиваем текущую квартиру
  };

  /**
   * Подсвечиваем ссылку на квартиру на поэтажном плане квартир (модальное окно)
   * @param {integer} currentFlat  текущая квартира
   */
  const showFlatLink = function (currentFlat) {
    flatsLink.removeClass("current-flat-link"); // удаляем активный класс у ссылок на квартиры
    $(`[data-flat-link=${currentFlat}]`).toggleClass("current-flat-link"); // подсвечиваем текущую ссылку на квартиру
  };

  /**
   * Переключаем класс для открытия/закрытия модального окна
   */
  const toggleModal = function () {
    modal.toggleClass("is-open");
  };

  /**
   * Подсвечиваем этаж при наведении мыши
   */
  floorPath.on("mouseover", function () {
    currentFloor = Number($(this).attr("data-floor")); // получаем значение этажа, указанного курсором мыши
    showCounter(currentFloor);
  });

  /**
   * Отслеживаем событие click по кнопке "вверх"
   */
  counterUp.on("click", function () {
    // значение текущего этажа не может превышать этажность дома (18)
    if (currentFloor < 18) {
      currentFloor++; // увеличиваем счётчик этажей на 1
      showCounter(currentFloor);
    }
  });

  /**
   * Отслеживаем событие click по кнопке "вниз"
   */
  counterDown.on("click", function () {
    // значение текущего этажа не может быть ниже жилых этажей (2)
    if (currentFloor > 2) {
      currentFloor--; // уменьшаем счётчик этажей на 1
      showCounter(currentFloor);
    }
  });

  // Подсвечиваем текущий этаж при загрузке страницы
  showCounter(currentFloor);

  /**
   * Отслеживаем событие click по этажу на изображении
   */
  floorPath.on("click", toggleModal);

  /**
   * Отслеживаем событие click по кнопке закрытия модального окна
   */
  modalCloseButton.on("click", toggleModal);

  /**
   * Отслеживаем событие click по кнопке "Смотреть квартиры на этаже"
   */
  viewFlatsButton.on("click", toggleModal);

  /**
   * Подсвечиваем ссылку при наведении мыши на изображении квартиры на поэтажном плане
   */
  flatsPath.on("mouseover", function () {
    // получаем порядковый номер квартиры на изображении (1-10)
    currentFlat = Number($(this).attr("data-flat"));
    showFlatLink(currentFlat);
  });

  /**
   * Убираем подсветку ссылки при снятии наведения мыши с изображения квартиры на поэтажном плане
   */
  flatsPath.on("mouseleave", function () {
    flatsLink.removeClass("current-flat-link"); // удаляем активный класс у ссылок на квартиры
  });

  /**
   * Подсвечиваем квартиру на изображении при наведении мыши на ссылку на поэтажном плане
   */
  flatsLink.on("mouseover", function () {
    // получаем порядковый номер ссылки, указанной курсором мыши (1-10)
    currentFlat = Number($(this).attr("data-flat-link"));
    showFlat(currentFlat);
  });

  /**
   * Убираем подсветку квартиры на изображении при снятии наведения мыши со ссылки на поэтажном плане
   */
  flatsLink.on("mouseleave", function () {
    flatsPath.removeClass("current-flat"); // удаляем активный класс у квартир на изображении
  });
});
