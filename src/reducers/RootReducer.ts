
import { RootActionTypes } from '../constants/actionTypes/RootActionTypes';


const defultGoodsItemFormDataState = {

};

const initialState = {
  goods: [],
  goodListLoaded: false,
  priceAscendingSort: false,
  nameAscendingSort: false,
  sortBy: 'price',
  filteringByNameSubstr: '',
  formData: defultGoodsItemFormDataState,
  formDataSaved: false,
  savingInProcess: false,
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
        sortBy: action.data.sortBy,
      }
    case RootActionTypes.OFF_PRICE_ASCENDING_SORT:
      return {
        ...state,
        priceAscendingSort: false,
        sortBy: action.data.sortBy,
      }
    case RootActionTypes.ON_NAME_ASCENDING_SORT:
      return {
        ...state,
        nameAscendingSort: true,
        sortBy: action.data.sortBy,
      }
    case RootActionTypes.OFF_NAME_ASCENDING_SORT:
      return {
        ...state,
        nameAscendingSort: false,
        sortBy: action.data.sortBy,
      }
    case RootActionTypes.SET_FILTERING_BY_NAME_SUBSTR:
      return {
        ...state,
        filteringByNameSubstr: action.data,
      }
    case RootActionTypes.SET_FORM_GOODS_ITEM_DATA:
      return {
        ...state,
        formData: action.data,
      }
    case RootActionTypes.RESET_FORM_GOODS_ITEM_DATA:
      return {
        ...state,
        formData: defultGoodsItemFormDataState,
      }
    case RootActionTypes.EDIT_FORM_GOODS_ITEM_DATA_VALUE:
      return {
        ...state,
        formData: { ...state.formData, [action.data.name]: action.data.value },
      }
    case RootActionTypes.SET_SAVING_IN_PROCESS:
      return {
        ...state,
        savingInProcess: action.data,
      }
    default:
      return state
  }
}
