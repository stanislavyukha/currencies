const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();

document.querySelector(".send").addEventListener("click", sendJSON);

function sendJSON() {
  fetch(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
    .then((res) => res.json())
    .then((data) => {
      const myList = document.getElementById("list");
      let newLi = document.createElement("li");

      for (let i = 0; i < data.length; i++) {
        newLi.textContent = "валюта: " + data[i].ccy;
        myList.appendChild(newLi);
        newLi.textContent = "покупка: " + data[i].buy;
        myList.appendChild(newLi);
        newli.textContent = "продаж: " + data[i].sale;
        myList.appendChild(newLi);
      }
    });
}

// document.querySelector('.send').addEventListener('click', sendJSON);

// function sendJSON() {

//     const xhr = new XMLHttpRequest();

//     xhr.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);

//     xhr.send(); // (1)

//     xhr.onreadystatechange = function () { // (3)
//         if (xhr.readyState != 4) return;

//         if (xhr.status != 200) {
//             console.log(xhr.statusText);
//         }

//         const currencies = xhr.responseText;
//         const myList = document.getElementById("list");
//         let newLi = document.createElement('li');
//         newLi.textContent = 'валюта: ' + currencies[0].ccy;
//         myList.appendChild(newLi);

//     }

// }
