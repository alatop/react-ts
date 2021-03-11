import React from "react";
import { editGoodsItemFormDataValue, saveGoodsFormData, loadCities, loadCountries } from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '@app-universal/Form/Input/TextInput';
import SelectInput from '@app-universal/Form/Input/SelectInput';
import RadioButtonGroupInput from '@app-universal/Form/Input/RadioButtonGroupInput';
import { GoodsItemType } from '@app-types';
import SubmitButton from '@app-universal/Form/Button/SubmitButton';
import {
  savingInProcessSelector, goodsItemFormIsReadytSelector,
  citiesListSelector, countriesListSelector,
} from '@app-reducers/commonSelectors';
import FormSection from '@app-universal/Form/Block/FromSection';
import { deliveryTypes } from '@app-constants/lists/deliveryTypes';

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

  }, [dispatch]);

  const onChange = React.useCallback((evt) => {
    dispatch(editGoodsItemFormDataValue(evt.target.name, evt.target.value));

  },
    [dispatch]);

  const onSubmit = React.useCallback((event) => {
    event.preventDefault();
    dispatch(saveGoodsFormData(itemId));

  },
    [dispatch, itemId]);
  const { name, price, count, email, country, city, deliveryType } = formData;

  return (
    <>
      { formDataIsLoaded ? <form onSubmit={onSubmit}>
        <FormSection>
          <TextInput name='name' value={name} placeholder="Название" onChange={onChange} />
          <TextInput name='price' value={price} placeholder="Цена" onChange={onChange} />
          <TextInput name='count' value={count} placeholder="Количество" onChange={onChange} />
          <TextInput name='email' value={email} placeholder="Email" onChange={onChange} />
        </FormSection>
        <FormSection>
          <SelectInput
            name='delivery'
            value={deliveryType}
            options={Object.values(deliveryTypes)}
            valueFieldName='value'
            valueTextFieldName='label'
            onChange={onChange}
            defaultValue={deliveryTypes.NO_DELIVERY.value}
            defaultLabel={deliveryTypes.NO_DELIVERY.label}
          />
          <RadioButtonGroupInput
            name='country'
            value={country}
            options={countries}
            valueFieldName='id' 
            valueTextFieldName='name'
            onChange={onChange}
          />
          <SelectInput
            name='country'
            value={country}
            options={countries} 
            valueFieldName='id' 
            valueTextFieldName='name' 
            onChange={onChange} />
          <SelectInput
            name='city'
            value={city}
            options={cities} valueFieldName='id' valueTextFieldName='name' onChange={onChange} />
        </FormSection>
        <SubmitButton text="Сохранить" disabled={savingInProcess} />
      </form>
        : 'Инициализация компонентов формы...'
      }

    </>
  );
}