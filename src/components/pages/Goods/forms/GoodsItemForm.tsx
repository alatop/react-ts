import React from "react";
import {
  editGoodsItemFormDataValue,
  loadCities, loadCountries,
  editGoodsItemFormDataArrayItems
} from '@app-actions/goodsActions';
import { useDispatch, useSelector } from 'react-redux';
import TextInput from '@app-universal/Form/Input/TextInput/TextInput';
import SelectInput from '@app-universal/Form/Input/SelectInput';
import RadioButtonGroupInput from '@app-universal/Form/Input/RadioButtonGroupInput';
import { GoodsItemType } from '@app-types';
import SubmitButton from '@app-universal/Form/Button/SubmitButton';
import {
  savingInProcessSelector,
  goodsItemFormIsReadytSelector, countriesListSelector,
} from '@app-reducers/commonSelectors';
import FormSection from '@app-universal/Form/Block/FromSection';
import { deliveryTypes } from '@app-constants/lists/deliveryTypes';
import ChekboxInputList from '@app-universal/Form/Input/ChekboxInputList';
import {
  correspondsToCountyCitiesSelector,
  isGoodsFormSavedSuccessfullySelector
} from '@app-reducers/formSelectors';
import jswl from 'js-wrapper-lib';
import { useHistory } from "react-router-dom";
import ValidationFrom from "@app-universal/Form/ValidationFrom";
import { ReactEventHandler } from "react";
import MoneyTextInput from '@app-universal/Form/Input/MoneyTextInput/MoneyTextInput';

type GoodsItemFormPropsType = {
  formData: GoodsItemType,
  itemId?: number | string,
  afterSaveRoute: string,
  onSuccess: () => any,
  onSubmit: ReactEventHandler,
};

export default function GoodsItemForm({
  formData, afterSaveRoute, onSuccess, onSubmit }: GoodsItemFormPropsType) {

  const dispatch = useDispatch();
  const savingInProcess = useSelector(savingInProcessSelector);
  const formDataIsLoaded = useSelector(goodsItemFormIsReadytSelector);
  const citiesList = useSelector(correspondsToCountyCitiesSelector);
  const countries = useSelector(countriesListSelector);
  const history = useHistory();
  const formSaved = useSelector(isGoodsFormSavedSuccessfullySelector);
  const { name, price, count, email, country, cities, deliveryType } = formData;

  const showCities = jswl.isDefined(deliveryType)
    ? (deliveryType === deliveryTypes.CITY.value)
    : false;
  const showCountries = jswl.isDefined(deliveryType)
    ? (showCities || (deliveryType === deliveryTypes.COUNTRY.value))
    : false;

  React.useEffect(() => {
    dispatch(loadCities);
    dispatch(loadCountries);
  }, [dispatch]);

  React.useEffect(() => {
    if (formSaved) {
      history.push(afterSaveRoute);
      onSuccess();
    }
  }, [formSaved, history, afterSaveRoute, onSuccess])

  const onChange = React.useCallback((evt) => {
    console.log('++onChange evt.target.value', evt.target.value);
    dispatch(editGoodsItemFormDataValue(evt.target.name, evt.target.value));
  },
    [dispatch]
  );

  const onChangeInt = React.useCallback((evt) => {
    console.log('evt.target.value', evt.target.value, parseInt(evt.target.value));

    let value: any = parseInt(evt.target.value);
    value =  !Number.isNaN(value) ? value : null;

    dispatch(editGoodsItemFormDataValue(evt.target.name,
      value));
  },
    [dispatch]
  );

  const onChangeIntArrayByCheckedItem = React.useCallback((evt) => {
    dispatch(editGoodsItemFormDataArrayItems(evt.target.name,
      parseInt(evt.target.value), (evt.target.checked)));
  },
    [dispatch]
  );

  console.log('------------- formData', formData);

  return (
    <>
      { formDataIsLoaded ?
        <ValidationFrom onSubmit={onSubmit} data={formData}>
          <FormSection>
            <TextInput
              name='name'
              value={name}
              placeholder="Название"
              onChange={onChange}
            />
            <MoneyTextInput
              name='price'
              value={price}
              placeholder="Цена"
              onChange={onChange}
            />
            <TextInput
              name='count'
              value={count}
              placeholder="Количество"
              onChange={onChangeInt}
            />
            <TextInput
              name='email'
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </FormSection>
          <FormSection>
            <SelectInput
              name='deliveryType'
              value={deliveryType}
              options={Object.values(deliveryTypes)}
              valueFieldName='value'
              valueTextFieldName='label'
              onChange={onChangeInt}
              defaultValue={deliveryTypes.NO_DELIVERY.value}
              defaultLabel={deliveryTypes.NO_DELIVERY.label}
            />
            {showCountries ?
              <RadioButtonGroupInput
                name='country'
                value={country}
                options={countries}
                valueFieldName='id'
                valueTextFieldName='name'
                onChange={onChangeInt}
              />
              :
              null
            }
            {showCities ?
              <ChekboxInputList
                name='cities'
                value={cities}
                options={citiesList}
                valueFieldName='id'
                valueTextFieldName='name'
                onChange={onChangeIntArrayByCheckedItem}
              />
              :
              null
            }
          </FormSection>
          <SubmitButton text="Сохранить" disabled={savingInProcess} />
        </ValidationFrom>
        : 'Инициализация компонентов формы...'
      }
    </>
  );
}