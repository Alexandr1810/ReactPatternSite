'use client'

/* -- Модальные окна -- */
export function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  const fadeElems = Array.from(el.getElementsByClassName("modal-fade"));

  el.style.display = "flex";
  // double rAF для корректного старта анимации
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      showSequentially(fadeElems);
    });
  });
}

export function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (!el) return;
  const fadeElems = Array.from(el.getElementsByClassName("modal-fade"));

  hideSequentially(fadeElems, () => {
    // скрываем контейнер после того, как все элементы исчезли
    el.style.display = "none";
  });
}

export function SendAlert(activeCity) {
  if (!activeCity.selected && !activeCity.detected && !activeCity.saved && !activeCity.url) {
      openModal('CityAlert')
  }
}

// Появление элементов по очереди
function showSequentially(elems) {
  let i = 0;

  function next() {
    if (i >= elems.length) return;

    const elem = elems[i];
    elem.classList.add("show");

    elem.addEventListener("transitionend", function handler(e) {
      if (e.target !== elem) return;
      elem.removeEventListener("transitionend", handler);

      i++;
      next();
    });
  }

  next();
}
// Исчезновение элементов по очереди
function hideSequentially(elems, callback) {
  let i = elems.length - 1; // начинаем с последнего, чтобы исчезало красиво "снизу вверх"

  function next() {
    if (i < 0) {
      if (callback) callback();
      return;
    }

    const elem = elems[i];
    elem.classList.remove("show");

    elem.addEventListener("transitionend", function handler(e) {
      if (e.target !== elem) return;
      elem.removeEventListener("transitionend", handler);

      i--;
      next();
    });
  }

  next();
}

// Функция для правильного склонения слов
export function pluralize(number, one, two, five) {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return five;
  if (n1 > 1 && n1 < 5) return two;
  if (n1 === 1) return one;
  return five;
}

// Локальное хранилище
export function setLocalStorage(key, value){
  return localStorage.setItem(key, value)
}
export function getLocalStorage(key){
  return localStorage.getItem(key)
}