import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const baseUrl = 'http://localhost:3004/';

export const loadGoods =  async (dispatch) => {
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


export const resetGoodsList =  async (dispatch) => {
	dispatch({
        type: RootActionTypes.RESET_GOODS_LIST,
    });
};