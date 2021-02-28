import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';
import { Dispatch } from 'redux';

const baseUrl = 'http://localhost:3004/';

export const loadGoods = async (dispatch: Dispatch) => {
    let response = await fetch(baseUrl + 'goods');
    // await new Promise(r => setTimeout(r, 1000));
    if (response.ok) {
        let json = await response.json();
        dispatch({
            type: RootActionTypes.SET_GOODS_LIST_DATA,
            data: json,
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const resetGoodsList = async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.RESET_GOODS_LIST,
    });
};

export const sortByPriceUp = async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.ON_PRICE_ASCENDING_SORT,
        data: { sortBy: 'price' },
    });
};

export const sortByPriceDown = async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.OFF_PRICE_ASCENDING_SORT,
        data: { sortBy: 'price' },
    });
};

export const sortByNameUp = async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.ON_NAME_ASCENDING_SORT,
        data: { sortBy: 'name' },
    });
};

export const sortByNameDown = async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.OFF_NAME_ASCENDING_SORT,
        data: { sortBy: 'name' },
    });
};

export const filterByName =  (substr: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.SET_FILTERING_BY_NAME_SUBSTR,
        data: substr,
    });
};



