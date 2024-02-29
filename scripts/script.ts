import { Data } from "../types/DataInterface";
import { DataCurrencies } from "../types/DataCurrenciesInterface";

let allRatesCurrencies: string[] = [];

//-- ELEMENTS HTML --
const amountCurrencyInput: HTMLInputElement = document.getElementById('amount') as HTMLInputElement;
const fromCurrencySelect: HTMLSelectElement = document.getElementById('inputCurrency') as HTMLSelectElement;
const toCurrencySelect: HTMLSelectElement = document.getElementById('outCurrency') as HTMLSelectElement;

const conversionResultText: HTMLParagraphElement = document.getElementById('conversion__result') as HTMLParagraphElement;
const convertButton: HTMLButtonElement = document.getElementById('convert__btn') as HTMLButtonElement;


const allCurrenciesURL: string = "https://raw.githubusercontent.com/Mirvik/currency-json/main/currency.json";

async function fetchCurrenciesData<T>(url: string): Promise<T | null>{
    try {
        const promise = await fetch(url);

        if (!promise.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await promise.json();
        return data;
    } catch (error) {
        console.error('Error here!:', error);
        return null;
    }
}


insertCurrenciesSelect();


async function insertCurrenciesSelect(): Promise<void> {

    const allCurrenciesJSON = await fetchCurrenciesData<Data>(allCurrenciesURL);
    if (allCurrenciesJSON === null){
        console.error('Response error');
    }
    else {
        const allCurrenciesDict: DataCurrencies = allCurrenciesJSON.rates;

        Object.values(allCurrenciesDict).forEach((rate):void => {
            allRatesCurrencies.push(rate);
        });

        //-------- INSERT OPTIONS IN SELECTS ---------
        Object.keys(allCurrenciesDict).forEach((currency, id) => {

            const optionInput: HTMLOptionElement = document.createElement('option');
            optionInput.value = allRatesCurrencies[id];
            const nameCurrencyInput: Text = document.createTextNode(currency);
            optionInput.appendChild(nameCurrencyInput);

            const optionOut: HTMLOptionElement = document.createElement('option');
            optionOut.value = allRatesCurrencies[id];
            const nameCurrencyOut: Text = document.createTextNode(currency);
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

function convertCurrency(): void {
    const amountCurrencyValue: number = Number(amountCurrencyInput.value);
    const optionFrom: HTMLOptionElement = fromCurrencySelect.options[fromCurrencySelect.selectedIndex];
    const optionTo: HTMLOptionElement = toCurrencySelect.options[toCurrencySelect.selectedIndex];

    if (optionFrom.value === optionTo.value){
        const resultNumber: number = amountCurrencyValue;
        const resultString: string = `${amountCurrencyValue} ${optionFrom.textContent} = ${resultNumber} ${optionTo.textContent}`; // RESULT "1 USD = 0.4 LTD"

        conversionResultText.innerHTML = resultString;
    }

    else {
        const resultNumber: number = amountCurrencyValue * Number(optionFrom.value) * Number(optionTo.value);
        const resultString: string = `${amountCurrencyValue} ${optionFrom.textContent} = ${resultNumber} ${optionTo.textContent}`; // RESULT "1 USD = 0.4 LTD"

        conversionResultText.innerHTML = resultString;
    }
}