let crashRide = document.querySelector('#crash-ride');
let hiHatTop = document.querySelector('#hihat-top');

// Radimo tranziciju u cssu
const animateCrashOrRide = () => {
  crashRide.style.transform = 'rotate(0deg) scale(1.5)';
};

const animateHiHatClosed = () => {
  hiHatTop.style.top = '171px';
};

// Detektiranje pritiska na cijeloj stranici
window.addEventListener("keydown", (e) => {
  let code = e.keyCode;

  // Treba provjeriti jeli postoji ta tipka u key mappingu jer inace baca greske
  let keyElement = document.querySelector(`div[data-key='${code}']`);

  // Key element je null ako ne postoji
  if (!keyElement) return;

  let audio = document.querySelector(`audio[data-key='${code}']`);

  // Vracanje na 0 da se svaki put reproducira ispocetka
  audio.currentTime = 0;

  // Reprodukcija zvuka
  audio.play();

  switch (code) {
    case 69:
    case 82:
      animateCrashOrRide();
      break;
    case 75:
    case 73:
      animateHiHatClosed();
      break;
  }

  // Stavljanje klase playing na gumbe, povecanje istih kad se stisnu
  keyElement.classList.add('playing');
});

// Funkcija koje nakon transformacije vraca u pocetnu poziciju
const removeCrashRideTransition = e => {
  // zanima nas samo transformacija, ostalo prekidamo
  if (e.propertyName !== 'transform') return;

  // Vracanje u pocetnu poziciju
  e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
};

const removeHiHatTopTransition = e => {
  if (e.propertyName !== 'top') return;

  e.target.style.top = '166px';
};

// Micanje klase sa gumbova da se smanje
let drumKeys = document.querySelectorAll('.key');

const removeKeyTransition = e => {
  if (e.propertyName !== 'transform') return;

  e.target.classList.remove('playing');
};

drumKeys.forEach(key => {
  key.addEventListener("transitionend", removeKeyTransition)
});

// Kada tranzicija u CSS-u zavrsi, dogadaju se ove funkcije
crashRide.addEventListener("transitionend", removeCrashRideTransition);
hiHatTop.addEventListener("transitionend", removeHiHatTopTransition);