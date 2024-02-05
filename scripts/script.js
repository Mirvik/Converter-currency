let allRatesCurrencies = [];

//-- ELEMENTS HTML --
let amountCurrencyInput = document.getElementById('amount');
let inputCurrencySelect = document.getElementById('inputCurrency');
let outCurrencySelect = document.getElementById('outCurrency');

let conversionResultText = document.getElementById('conversion__result');
let convertButton = document.getElementById('convert__btn');

// ------- START GET ALL CURRENCIES ------------
const allCurrenciesURL = "https://raw.githubusercontent.com/Mirvik/currency-json/main/currency.json";

async function fetchCurrenciesData(url){
    try {
        const promise = await fetch(url); //---------------GET A DATA IN JSON FILE----------

        if (!promise.ok) {      //--------IF PROMISE WAS NOT OK--------
            throw new Error('Network response was not ok');
        }
        const data = await promise.json();
        return data;
    } catch (error) {
        console.error('Error here!:', error);
        return [];
    }
}


async function inserAllCurrenciesInSelectsAndGetAllRates(){

    const allCurrenciesJSON = await fetchCurrenciesData(allCurrenciesURL);
    const allCurrenciesDict = allCurrenciesJSON.rates;

    // ------ MAKE AN ARRAY WITH ALL RATES CURRENCIES -------
    Object.values(allCurrenciesDict).forEach(rate => {
        
        // ADD RATE
        allRatesCurrencies.push(rate);
    });

    //-------- ADD OPTIONS IN SELECTS WITH NAME CURRENCIES---------
    let id = 0;
    Object.keys(allCurrenciesDict).forEach(currency => {
        // TEMPLATE OPTION FOR INPUT SELECT
        const optionInput = document.createElement('option');
        optionInput.value = allRatesCurrencies[id]; //------------ ADD A RATE IN VALUE---------
        const nameCurrencyInput = document.createTextNode(currency);
        optionInput.appendChild(nameCurrencyInput);

        // TEMPLATE OPTION FOR OUT SELECT
        const optionOut = document.createElement('option');
        optionOut.value = allRatesCurrencies[id];  //------------ ADD A RATE IN VALUE-----------
        const nameCurrencyOut = document.createTextNode(currency);
        optionOut.appendChild(nameCurrencyOut);

        // ADD OPTIONS IN INPUT AND OUT
        inputCurrencySelect.appendChild(optionInput);
        outCurrencySelect.appendChild(optionOut);

        id++;
    });
}
// ------------- END GET ALL CURRENCIES -----------------



// ---------ADD IN SELECTS ALL CURRENCIES--------
inserAllCurrenciesInSelectsAndGetAllRates();



// --------------- CONVERT -------------------
convertButton.addEventListener('click', convertCurrency);
amountCurrencyInput.addEventListener('change', convertCurrency);
inputCurrencySelect.addEventListener('change', convertCurrency);
outCurrencySelect.addEventListener('change', convertCurrency);

function convertCurrency() {
    const amountCurrencyValue = amountCurrencyInput.value;      // --------GET AN AMOUNT---------
    const optionInputSelected = inputCurrencySelect.options[inputCurrencySelect.selectedIndex];         // GET OPTION, WHO IS SELECTED
    const optionOutSelected = outCurrencySelect.options[outCurrencySelect.selectedIndex];       // GET OPTION, WHO IS SELECTED

    // ---------IF SELECTED CURRENCIES ARE THE SAME, THEN RESULT IS A AMOUNT-----------
    if (optionInputSelected.value == optionOutSelected.value){
        const resultNumber = amountCurrencyValue;
        const resultString = `${amountCurrencyValue} ${optionInputSelected.textContent} = ${resultNumber} ${optionOutSelected.textContent}`; // RESULT "1 USD = 0.4 LTD"

        conversionResultText.innerHTML = resultString;
    }


    // ------------ IF SELECTED CURRENCIES ARE DIFFERENT --------------
    else {
        const resultNumber = amountCurrencyValue * optionInputSelected.value * optionOutSelected.value;
        const resultString = `${amountCurrencyValue} ${optionInputSelected.textContent} = ${resultNumber} ${optionOutSelected.textContent}`; // RESULT "1 USD = 0.4 LTD"

        conversionResultText.innerHTML = resultString;
    }
}
// ------------------- END CONVERT ----------------