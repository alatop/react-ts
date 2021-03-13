import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';
import { Dispatch } from 'redux';
import { goodsItemFormDataSelector } from '@app-reducers/commonSelectors';

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

export const loadCities = async (dispatch: Dispatch) => {
    let response = await fetch(baseUrl + 'cities');
    if (response.ok) {
        let json = await response.json();
        dispatch({
            type: RootActionTypes.SET_CITIES_LIST,
            data: json,
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const loadCountries = async (dispatch: Dispatch) => {
    let response = await fetch(baseUrl + 'countries');
    if (response.ok) {
        let json = await response.json();
        dispatch({
            type: RootActionTypes.SET_COUNTRIES_LIST,
            data: json,
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const getGoodsItemFormData = (itemId: number | string) => async (dispatch: Dispatch) => {
    let response = await fetch(baseUrl + 'goods/' + itemId);
    // await new Promise(r => setTimeout(r, 1000));
    if (response.ok) {
        let json = await response.json();
        dispatch({
            type: RootActionTypes.SET_FORM_GOODS_ITEM_DATA,
            data: json,
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const editGoodsItemFormDataValue = (name: string, value: any) => async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.EDIT_FORM_GOODS_ITEM_DATA_VALUE,
        data: {
            name: name,
            value: value,
        },
    });
};

export const saveGoodsFormData = (itemId: number | string) => async (dispatch: Dispatch, getState: Function) => {


    const data = goodsItemFormDataSelector(getState());

    console.log('saveGoodsFormData data', data);

    onSavingInProcess(dispatch);
    let response = await fetch(
        baseUrl + 'goods/' + itemId,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    offSavingInProcess(dispatch);

    if (response.ok) {
        let json = await response.json();
        dispatch({
            type: RootActionTypes.SET_FORM_GOODS_ITEM_DATA,
            data: json,
        });
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};

export const onSavingInProcess = (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.SET_SAVING_IN_PROCESS,
        data: true,
    });
};

export const offSavingInProcess = (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.SET_SAVING_IN_PROCESS,
        data: false,
    });
};

export const resetGoodsItemFormData = (itemId: number | string) => async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.RESET_FORM_GOODS_ITEM_DATA,
    });
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

export const filterByName = (substr?: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: RootActionTypes.SET_FILTERING_BY_NAME_SUBSTR,
        data: substr,
    });
};



