const BASE_URL = "https://v6.exchangerate-api.com/v6/5cca0e139ac7033a5bb12179/latest/USD";

let dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Assuming `countryList` is defined somewhere in your code
// Example:
// const countryList = { "USD": "US", "PKR": "PK", ... };

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// btn event listener
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = parseFloat(amount.value);
    if (isNaN(amtVal) || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;

    fetch(`${BASE_URL}`)
        .then(response => response.json())
        .then(data => {
            let rate = data.conversion_rates[toCurrency];
            let convertedAmount = (amtVal * rate).toFixed(2);
            document.querySelector(".msg p").innerHTML = `${amtVal} <span>${fromCurrency}</span> = <span>${convertedAmount}</span> ${toCurrency}`;
            btn.style.backgroundColor = "#FFBF00";  // Change button background color to green
            btn.style.color = "#000000";            // Change button font color to white
            btn.style.fontWeight = "bolder";        // Make button font bold
        })
        .catch(error => console.error('Error fetching the exchange rate:', error));
});




















// const BASE_URL = "https://v6.exchangerate-api.com/v6/5cca0e139ac7033a5bb12179/latest/USD";


// let dropdowns = document.querySelectorAll(".drop-down select");
// const btn = document.querySelector("form button");

// const fromCurr = document.querySelector(".form select");
// const toCurr = document.querySelector(".to select");


// for (let select of dropdowns) {
//     for (let currCode in countryList) {
//         let newOption = document.createElement("option");
//         newOption.innerText = currCode;
//         newOption.value = currCode;
//         if (select.name === "from" && currCode === "USD") {
//             newOption.selected = "selected";
//         } else if (select.name === "to" && currCode === "PKR") {
//             newOption.selected = "selected";
//         }

//         select.append(newOption);
//     }
//     select.addEventListener("change", (evt) => {
//         updateFlag(evt.target);
//     })
// }

// const updateFlag = (element) => {
//     let currCode = element.value;
//     let countrycode = countryList[currCode];
//     let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
//     let img = element.parentElement.querySelector("img");
//     img.src = newSrc;
// }


// // btn

// btn.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     let amount = document.querySelector(".amount input");
//     let amtVal = amount.value;
//     console.log(amtVal);
//     if (amtVal === "" || amtVal < 1) {
//         amtVal = 1;
//         amount.value = "1";
//     }
// })

// console.log(fromCurr, toCurr);
// // const URL = `${BASE_URL}/${fromCurr}/${toCurr}.json`;