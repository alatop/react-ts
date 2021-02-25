import { createSelector } from 'reselect';


export const getGoodsListIsLoaded = state => {
    return state.goodListLoaded;
}

export const priceAscendingSortSelector = state => {
    return state.priceAscendingSort;
}

export const goodsListSelector = state => {
    return state.goods;
}


function sortUp(a, b) { return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0) };
function sortDown(a, b) { return (a.price < b.price) ? 1 : ((b.price > a.price) ? -1 : 0) };

export const goodsLisSortedtSelector = createSelector(
    goodsListSelector,
    priceAscendingSortSelector,
    (goods, sortAsc) => {
        const sortFunc = sortAsc ? sortUp : sortDown;
        return goods.sort(sortFunc);
    }
);




