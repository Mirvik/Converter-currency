let allRatesCurrencies = [];
//-- ELEMENTS HTML --
const amountCurrencyInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('inputCurrency');
const toCurrencySelect = document.getElementById('outCurrency');
const conversionResultText = document.getElementById('conversion__result');
const convertButton = document.getElementById('convert__btn');
const allCurrenciesURL = "https://raw.githubusercontent.com/Mirvik/currency-json/main/currency.json";
async function fetchCurrenciesData(url) {
    try {
        const promise = await fetch(url);
        if (!promise.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await promise.json();
        return data;
    }
    catch (error) {
        console.error('Error here!:', error);
        return null;
    }
}
insertCurrenciesSelect();
async function insertCurrenciesSelect() {
    const allCurrenciesJSON = await fetchCurrenciesData(allCurrenciesURL);
    if (allCurrenciesJSON === null) {
        console.error('Response error');
    }
    else {
        const allCurrenciesDict = allCurrenciesJSON.rates;
        Object.values(allCurrenciesDict).forEach((rate) => {
            allRatesCurrencies.push(rate);
        });
        //-------- INSERT OPTIONS IN SELECTS ---------
        Object.keys(allCurrenciesDict).forEach((currency, id) => {
            const optionInput = document.createElement('option');
            optionInput.value = allRatesCurrencies[id];
            const nameCurrencyInput = document.createTextNode(currency);
            optionInput.appendChild(nameCurrencyInput);
            const optionOut = document.createElement('option');
            optionOut.value = allRatesCurrencies[id];
            const nameCurrencyOut = document.createTextNode(currency);
            optionOut.appendChild(nameCurrencyOut);
            // INSERT OPTIONS
            fromCurrencySelect.appendChild(optionInput);
            toCurrencySelect.appendChild(optionOut);
        });
    }
}
// --------------- CONVERT -------------------
convertButton.addEventListener('click', convertCurrency);
amountCurrencyInput.addEventListener('input', convertCurrency);
fromCurrencySelect.addEventListener('change', convertCurrency);
toCurrencySelect.addEventListener('change', convertCurrency);
function convertCurrency() {
    const amountCurrencyValue = Number(amountCurrencyInput.value);
    const optionFrom = fromCurrencySelect.options[fromCurrencySelect.selectedIndex];
    const optionTo = toCurrencySelect.options[toCurrencySelect.selectedIndex];
    if (optionFrom.value === optionTo.value) {
        const resultNumber = amountCurrencyValue;
        const resultString = `${amountCurrencyValue} ${optionFrom.textContent} = ${resultNumber} ${optionTo.textContent}`; // RESULT "1 USD = 0.4 LTD"
        conversionResultText.innerHTML = resultString;
    }
    else {
        const resultNumber = amountCurrencyValue * Number(optionFrom.value) * Number(optionTo.value);
        const resultString = `${amountCurrencyValue} ${optionFrom.textContent} = ${resultNumber} ${optionTo.textContent}`; // RESULT "1 USD = 0.4 LTD"
        conversionResultText.innerHTML = resultString;
    }
}
// export {};
