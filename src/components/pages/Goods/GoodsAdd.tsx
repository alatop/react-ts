import React from "react";
import ModalWindow from '@app-universal/Common/ModalWindow/ModalWindows';
import {
  saveGoodsFormDataAsNewItem,
  resetGoodsItemFormData, loadGoods,
} from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  goodsItemFormDataSelector,
} from '@app-reducers/commonSelectors';
import { match } from 'react-router';
import GoodsItemForm from './forms/GoodsItemForm';
import { History } from 'history';

// указываем допустимые в нашем случае параметры
type filterParams = {
  goods_id?: string,
  // name?: string,
}
type GoodsEditPropsType = {
  history: History,
  match: match<filterParams>,
};

export default function GoodsEdit({ match }: GoodsEditPropsType) {

  const dispatch = useDispatch();
  const formState = useSelector(goodsItemFormDataSelector);

  const reloadGoods = React.useCallback(() => {
    dispatch(loadGoods);
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch(resetGoodsItemFormData);
    };
  },
    [dispatch]
  );

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    dispatch(saveGoodsFormDataAsNewItem);
  },
    [dispatch]
  );

  return (
    <ModalWindow
      backRoute='/goods'
    >
      <h2>Добавление товара </h2>
      
      <GoodsItemForm
        formData={formState}
        afterSaveRoute='/goods'
        onSuccess={reloadGoods}
        onSubmit={onSubmit}
      />

    </ModalWindow>
  );
}