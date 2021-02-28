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


function sortPriceUp(a, b) { return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0) };
function sortPriceDown(a, b) { return (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0) };

function sortNameUp(a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0) };
function sortNameDown(a, b) { return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0) };

export const goodsLisSortedtSelector = createSelector(
    goodsListSelector,
    sortBySelector,
    priceAscendingSortSelector,
    nameAscendingSortSelector,
    (goods, sortBy, sortPriceAsc, sortNameAsc) => {


        let sortFunc = () => { };
        switch (sortBy) {
            case 'price':
                sortFunc = sortPriceAsc ? sortPriceUp : sortPriceDown;
                break;
            case 'name':
                sortFunc = sortNameAsc ? sortNameUp : sortNameDown;
                break;
        }

        const result = goods.sort(sortFunc);
        console.log('------sortPriceAsc', sortPriceAsc, result);
        return [...result];
    }
);



