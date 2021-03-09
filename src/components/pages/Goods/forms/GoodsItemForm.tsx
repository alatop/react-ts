import React from "react";
import { editGoodsItemFormDataValue, saveGoodsFormData, loadCities, loadCountries } from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '@app-universal/Form/Input/TextInput';
import SelectInput from '@app-universal/Form/Input/SelectInput';
import { GoodsItemType } from '@app-types';
import SubmitButton from '@app-universal/Form/Button/SubmitButton';
import {
  savingInProcessSelector, goodsItemFormIsReadytSelector,
  citiesListSelector, countriesListSelector,
} from '@app-reducers/commonSelectors';
import FormSection from '@app-universal/Form/Block/FromSection';

type GoodsEditPropsType = {
  formData: GoodsItemType,
  itemId: number | string,
};

export default function GoodsItemForm({ formData, itemId }: GoodsEditPropsType) {

  const dispatch = useDispatch();
  const savingInProcess = useSelector(savingInProcessSelector);
  const formDataIsLoaded = useSelector(goodsItemFormIsReadytSelector);
  const cities = useSelector(citiesListSelector);
  const countries = useSelector(countriesListSelector);

  React.useEffect(() => {

    dispatch(loadCities);
    dispatch(loadCountries);

  }, []);

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
      { formDataIsLoaded ? <form onSubmit={onSubmit}>
        <FormSection>
          <TextInput name='name' value={formData.name} onChange={onChange} />
          <TextInput name='price' value={formData.price} onChange={onChange} />
        </FormSection>
        <FormSection>
          <SelectInput name='city' options={cities} valueFieldName='id' valueTextFieldName='name' />
          <SelectInput name='country' options={countries} valueFieldName='id' valueTextFieldName='name' />
        </FormSection>
        <SubmitButton text="Сохранить" disabled={savingInProcess} />
      </form>
        : 'Инициализация компонентов формы...'
      }

    </>
  );
}