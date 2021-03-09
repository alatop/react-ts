import React from "react";
import { editGoodsItemFormDataValue, saveGoodsFormData } from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '@app-universal/Form/TextInput';
import { GoodsItemType } from '@app-types';
import SubmitButton from '@app-universal/Form/Button/SubmitButton';
import {
  savingInProcessSelector
} from '@app-reducers/commonSelectors';

type GoodsEditPropsType = {
  formData: GoodsItemType,
  itemId: number | string,
};

export default function GoodsItemForm({ formData, itemId }: GoodsEditPropsType) {

  const dispatch = useDispatch();
  const savingInProcess = useSelector(savingInProcessSelector);

  const onChange = React.useCallback((evt) => {
    dispatch(editGoodsItemFormDataValue(evt.target.name, evt.target.value));

  },
    [dispatch]);


  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    dispatch(saveGoodsFormData(itemId));

  },
    [dispatch, itemId]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextInput name='name' value={formData.name} onChange={onChange} />
        <TextInput name='price' value={formData.price} onChange={onChange} />
        <SubmitButton text="Сохранить" disabled={savingInProcess} />
      </form>
    </>
  );
}