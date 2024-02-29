import { DataCurrencies } from "./DataCurrenciesInterface"

interface Data {
    date: string,
    base: string,
    rates: DataCurrencies
}

export { Data }