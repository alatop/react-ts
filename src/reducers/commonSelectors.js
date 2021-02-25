import { createSelector } from 'reselect';

export const getGoodsList = state => {
    return state.goods;
}

export const getGoodsListIsLoaded = state => {
    return state.goodListLoaded;
}



