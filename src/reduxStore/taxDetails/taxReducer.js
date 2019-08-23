import { TAX_COUNTRIES_LOADED } from './taxActions';
const initialState = {
    isTaxResident: null,
    countries: [],
    selectedCountries: [],
    age: '100',
    fruits: { 'apple': true },
    text: 'asdf'
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TAX_COUNTRIES_LOADED:
            return { ...state, countries: action.countryList };
        default:
            return state;
    }
};