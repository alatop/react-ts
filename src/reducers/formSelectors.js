import { createSelector } from 'reselect';
import { citiesListSelector } from './commonSelectors';


export const selectedCountrySelector = state => {
    return state.formData ? state.formData.country : null;
}

export const selectedDeliveryTypeSelector = state => {
    return state.formData ? state.formData.deliveryType : null;
}

export const correspondsToCountyCitiesSelector = createSelector(
    citiesListSelector,
    selectedCountrySelector,
    (cities, country) => {
        let result = filterByCountry(cities, country);
        // console.log(' filtred result', result);
        return  result;
    }
);

function filterByCountry(arr, value) {
    return arr.filter((el) => {
        // console.log('element corre:', el.id === value, el, value);
        return (el.country === value);
    });
}

export const isGoodsFormSavedSuccessfullySelector = state => {
    return state.formDataSaved;
}





