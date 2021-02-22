
import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const initialState = {
    goods: [],
    goodListLoaded: false,
  }

type commonActionType = {
  type: string,
  data: any,
}

export default function rootReducer(state = initialState, action: commonActionType) {
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