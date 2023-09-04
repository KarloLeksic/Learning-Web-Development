function inflationCalculator() {
  let inflationRate = document.querySelector('#inflationRate');
  let money = document.querySelector('#money');

  // pretvaranje stringova u decimalni broj
  inflationRate = parseFloat(inflationRate.value);
  money = parseFloat(money.value);

  let years = document.querySelector('#years').value;
  years = parseFloat(years);

  // Formula za inflaciju za jednu godinu
  let worth = money + (money * (inflationRate / 100));

  // Svake godine raste inflacija u odnosu na prethodnu godinu
  for(let i = 1; i < years; i++) {
    worth += worth * (inflationRate / 100);
  }

  // Zaokruzivanje na 2 decimale
  worth = worth.toFixed(2);

  // Dodavanje elemenata
  let newElement = document.createElement('div');
  newElement.className = 'new-value';
  newElement.innerText = `Danasnjih ${money}€ vrijedi isto kao ${worth} za ${years}`;
  document.querySelector('.container').appendChild(newElement);
}