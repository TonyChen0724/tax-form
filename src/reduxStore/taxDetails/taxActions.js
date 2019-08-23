export const TAX_COUNTRIES_LOADED = Symbol('TAX_COUNTRIES_LOADED');
export const createTaxCountriesLoadedAction = (countryList) => {
    return { type: TAX_COUNTRIES_LOADED, countryList };
}

