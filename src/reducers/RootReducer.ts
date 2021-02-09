
import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const initialState = {
    goods: [],
  }

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case RootActionTypes.SET_GOODS_LIST_DATA:
        return { ...state,
          goods: action.data,
        }
      default:
        return state
    }
  }