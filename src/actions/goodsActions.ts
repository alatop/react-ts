import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const baseUrl = 'http://localhost:3004/';

export const loadGoods = (successCallback) => async (dispatch) => {
	let response = await fetch(baseUrl + 'goods');

    if (response.ok) { 
        let json = await response.json();
        dispatch({ // уведомляем всех (компоненты), что пользователь залогинился
            type: RootActionTypes.SET_GOODS_LIST_DATA,
            data: json,
        });
        successCallback(json);
    } else {
        alert("Ошибка HTTP: " + response.status);
    }
};