function Utilities() {
  let name = 'me';
};

const convert = {};

const display = {};



// load the NZD
// reactToCurrencySelection(document.getElementById('nzd'));
const currentNZRate = document.querySelector('#nzd #currentRate').innerHTML.split(' ')[0];
renderPrices(currentNZRate, 'NZD');
document.querySelector('#nzd').classList.add('active');

document.querySelector('#currencyPicker')
  .addEventListener('click', reactToCurrencySelection, true);


function reactToCurrencySelection(el) {
  const rateInfo = el.srcElement.innerText.split(' ');

  // remove .active class from other buttons and add to this
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach((el) => {
    el.classList.remove('active');
  });
  el.target.parentNode.classList.add('active');

  const currencyRate = rateInfo[0];
  const currencyCode = rateInfo[1];

  renderPrices(currencyRate, currencyCode);
}

function renderPrices(exchangeRate, currencyCode) {
  const currencyNameFields = document.querySelectorAll('.currencyCode');

  currencyNameFields.forEach((el) => {
    el.innerHTML = currencyCode;
  });

  calculateTotal(exchangeRate, currencyCode);
}

function calculateTotal(exchangeRate, currencyCode) {
  let totalLocalPrice = 0;
  const expenseRows = document.getElementsByClassName('expense');
  const currencyNameFields = document.querySelectorAll('.currencyCode');


  Array.from(expenseRows).forEach((el) => {
    const localPrice = removeCommas(el.querySelector('.itemPriceLocal').innerHTML);
    const customPrice = el.getElementsByClassName('itemPriceCustom')[0];

    newPrice = convertToCustomPrice(localPrice, exchangeRate, currencyCode);


    customPrice.innerHTML = formatCustomPrice(newPrice, currencyCode);


    totalLocalPrice += Number(localPrice);
  });

  document.getElementById('totalPriceLocal').innerHTML = Utilities.addCommas(totalLocalPrice);
  document.getElementById('totalPriceCustom').innerHTML = convertToCustomPrice(totalLocalPrice, exchangeRate, currencyCode);
}


function formatCustomPrice(newPrice, currencyCode) {
    if (currencyCode != 'VND' || currencyCode != 'JPY') {
      return '$' + newPrice;
    }
    return newPrice;
}

function convertToCustomPrice(localPrice, exchangeRate, currencyCode) {
  if (currencyCode === 'VND' || currencyCode === 'JPY') {
    return convertToVND(localPrice, exchangeRate);
  }
  return convertToDecimalPrice(localPrice, exchangeRate);
}

// accept Num
// return string

Utilities.prototype.addCommas = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function removeCommas(string) {
  return string.replace(/,\s?/g, '');
}

function convertLocalPriceToCustomPrice(localPrice, exchangeRate) {
  return localPrice * exchangeRate;
}

function convertToDecimalPrice(localPrice, exchangeRate) {
  const num = parseFloat(localPrice * exchangeRate).toFixed(2);
  return Utilities.addCommas(num)
}

function convertToVND(localPrice, exchangeRate) {
  const value = Math.round(localPrice * exchangeRate);
  return Utilities.addCommas(value);
}

function appendSectionTotal() {
  const daySections = document.querySelectorAll('section.day');
  // console.log(daySections);

  appendSubTotals(daySections);
}

function appendSubTotals(daySections) {

  daySections.forEach((day) => {
    // Add a new row for subtotal
    const node = document.createElement('div');
    node.classList.add('row', 'border', 'text-white', 'bg-info', 'p-2', 'mt-2', 'rounded', 'shadow');
    node.textContent = "";
    const titleCol = document.createElement('div');
    titleCol.classList.add('col-5');
    titleCol.textContent = 'Total';
    node.appendChild(titleCol);

    const priceLocalCol = document.createElement('div');
    priceLocalCol.classList.add('col-3');
    node.appendChild(priceLocalCol);

      const priceLocalPrice = document.createElement('span');
      // priceLocalPrice.textContent = '';
      priceLocalPrice.setAttribute('id', 'subtotalLocal');
      priceLocalCol.appendChild(priceLocalPrice);

      const priceLocalCode = document.createElement('span');
      priceLocalCode.textContent = 'VND';
      priceLocalCode.classList.add('localPriceCode', 'ml-2');
      priceLocalCol.appendChild(priceLocalCode);


    const priceCustomCol = document.createElement('div');
    priceCustomCol.classList.add('col-4', 'text-right');
    node.appendChild(priceCustomCol);

      const priceCustomPrice = document.createElement('span');
      // priceCustomPrice.textContent = '666';
      priceCustomPrice.setAttribute('id', 'subtotalCustom');
      priceCustomCol.appendChild(priceCustomPrice);

      const priceCustomCode = document.createElement('span');
      // priceCustomCode.textContent = ' KKK';
      priceCustomCode.classList.add('currencyCode');
      priceCustomCol.appendChild(priceCustomCode);

    day.appendChild(node);
  });
}

appendSectionTotal();



  const sections = document.querySelectorAll('section.day');
  sections.forEach((s) => {
    let sectionTotal = 0;
    const rows = s.querySelectorAll('.itemPriceLocal');
    rows.forEach((row) => {
      sectionTotal += Number(removeCommas(row.innerHTML));
    });

    s.querySelector('#subtotalLocal').innerHTML = Utilities.addCommas(sectionTotal);

    // s.querySelector('#subtotalCustom').innerHTML = convertToCustomPrice(sectionTotal, 2, 'NZD');
  })


function calculateSectionTotal() {
  // console.log(sections);
  sections.forEach((s) => {
    let sectionTotal = 0;
    const rows = s.querySelectorAll('.itemPriceLocal');
    rows.forEach((row) => {
      sectionTotal += Number(removeCommas(row.innerHTML));
    });

    // Add a new row for subtotal
    const node = document.createElement('div');
    node.classList.add('bg-danger');
    node.textContent = "Hello world";
    s.appendChild(node);

    // console.log(sectionTotal);
    console.log(s);
    // s.querySelector('#sectionTotal').innerHTML = 'xxxx';
  });
}






const currencies = {
  USD: {
    sign: '$',
    decimals: 2,
  },
};