$(document).ready(function () {
  let currentFloor = 2; // текущий этаж
  const floorPath = $(".home-image path"); // каждый отдельный этаж в SVG
  const counterUp = $(".counter-up"); // кнопка увеличения этажа
  const counterDown = $(".counter-down"); // кнопка уменьшения этажа

  const modal = $(".modal"); // модальное окно
  const modalCloseButton = $(".modal-close-button"); // кнопка закрытия модального окна
  const viewFlatsButton = $(".view-flats"); // кнопка "Смотреть квартиры на этаже"

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
});
