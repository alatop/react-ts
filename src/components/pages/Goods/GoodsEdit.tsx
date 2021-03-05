import React from "react";
import ModalWindow from '@app-universal/Common/ModalWindow/ModalWindows';
import { getGoodsItemFormData, resetGoodsItemFormData, } from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  goodsItemFormDataSelector,
} from '@app-reducers/commonSelectors';
import GoodsItemForm from './forms/GoodsItemForm';

type GoodsEditPropsType = any;

export default function GoodsEdit(props: GoodsEditPropsType) {

  const itemId = props.match.params.goods_id;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGoodsItemFormData(itemId));

    return () => {
      dispatch(resetGoodsItemFormData);
    };
  },
    [dispatch]
  );

  const formState = useSelector(goodsItemFormDataSelector);


  return (
    <ModalWindow
      backRoute='/goods'
    >
      <h2>Редактирование товара </h2>

      <GoodsItemForm 
        formData={formState}
        itemId={itemId}
      />

    </ModalWindow>
  );
}