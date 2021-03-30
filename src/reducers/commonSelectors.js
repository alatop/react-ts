import { createSelector } from 'reselect';


export const getGoodsListIsLoaded = state => {
    return state.goodListLoaded;
}

export const sortBySelector = state => {
    return state.sortBy;
}

export const priceAscendingSortSelector = state => {
    return state.priceAscendingSort;
}

export const nameAscendingSortSelector = state => {
    return state.nameAscendingSort;
}

export const goodsListSelector = state => {
    return state.goods;
}

export const filteringByNameSubstrSelector = state => {
    return state.filteringByNameSubstr;
}

export const goodsItemFormDataSelector = state => {
    return state.formData;
}

export const savingInProcessSelector = state => {
    return state.savingInProcess;
}

export const citiesListSelector = state => {
    return state.citiesList;
}

export const countriesListSelector = state => {
    return state.countriesList;
}

export const goodsItemFormIsReadytSelector = createSelector(
    citiesListSelector,
    countriesListSelector,
    (cities, countries) => {
        return (cities.length && countries.length) ;
    }
);


function sortPriceUp(a, b) { return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0) };
function sortPriceDown(a, b) { return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0) };

function sortNameUp(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) };
function sortNameDown(a, b) { return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0) };
function filterByName(arr, substr) {
    return arr.filter((el) => {
        console.log('element:', el);
        return (el.name.indexOf(substr) !== -1)
    });
}

export const goodsLisSortedtSelector = createSelector(
    goodsListSelector,
    sortBySelector,
    priceAscendingSortSelector,
    nameAscendingSortSelector,
    filteringByNameSubstrSelector,
    (goods, sortBy, sortPriceAsc, sortNameAsc, nameFilterSubst) => {


        let sortFunc = () => { };
        switch (sortBy) {
            case 'price':
                sortFunc = sortPriceAsc ? sortPriceUp : sortPriceDown;
                break;
            case 'name':
                sortFunc = sortNameAsc ? sortNameUp : sortNameDown;
                break;
            default: 
        }

        let result = goods.sort(sortFunc);
        result = nameFilterSubst ? filterByName(result, nameFilterSubst) : result;
        return [...result];
    }
);



