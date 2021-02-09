
import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const initialState = {
    goods: [],
    goodListLoaded: false,
  }

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case RootActionTypes.SET_GOODS_LIST_DATA:
        return { ...state,
          goods: action.data,
          goodListLoaded: true,
        }
      case RootActionTypes.RESET_GOODS_LIST:
        return { ...state,
          goods: [],
          goodListLoaded: false,
        }
      default:
        return state
    }
  }