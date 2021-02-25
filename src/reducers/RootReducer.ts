
import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';

const initialState = {
  goods: [],
  goodListLoaded: false,
  priceAscendingSort: false,
}

type commonActionType = {
  type: string,
  data: any,
}

export default function rootReducer(state = initialState, action: commonActionType) {
  switch (action.type) {
    case RootActionTypes.SET_GOODS_LIST_DATA:
      return {
        ...state,
        goods: action.data,
        goodListLoaded: true,
      }
    case RootActionTypes.RESET_GOODS_LIST:
      return {
        ...state,
        goods: [],
        goodListLoaded: false,
      }
    case RootActionTypes.ON_PRICE_ASCENDING_SORT:
      return {
        ...state,
        priceAscendingSort: true,
      }
    case RootActionTypes.OFF_PRICE_ASCENDING_SORT:
      return {
        ...state,
        priceAscendingSort: false,
      }
    default:
      return state
  }
}