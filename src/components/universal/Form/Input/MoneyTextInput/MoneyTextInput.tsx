
import React from "react";
import { ChangeEventHandler } from "react";
import jswl from 'js-wrapper-lib';
import TextInput from '../TextInput/TextInput';
import IMask from 'imask';
import {createEventLikeObject } from '@app-universal/helpers/eventHalper';
type MoneyTextInputPropsType = {

    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
}

const moneyMask = IMask.createMask({
    mask: '$num',
    blocks: {
        num: {
            mask: Number,
            thousandsSeparator: ',',
            radix: '.',
        }
    }
});



export default function MoneyTextInput(
    { value, onChange, name, placeholder }: MoneyTextInputPropsType) {

    const [unfocusedValue, setUnfocusedValue] = React.useState('');
    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const [shownValue, setShownValue] = React.useState(value);

    React.useEffect(() => {
        if (jswl.isDefined(value)) {
            console.log('-----------MoneyTextInput value', value);
            setUnfocusedValue(moneyMask.resolve(value.toString()));
        }
        console.log('-----------MoneyTextInput value 2', value);
        setShownValue(value);
    },
        [value, setUnfocusedValue, setShownValue]
    );

    const moneyOnChange = React.useCallback((evt) => {
        let value = evt.target.value;
        if (value.length > 1
            && (value.substr(value.length - 1) === '.')) {

            let clearValue: any = parseInt(evt.target.value);
            clearValue = !Number.isNaN(value) ? value : null;

            setShownValue(clearValue + '.');
            evt.target.value = clearValue ? clearValue : '';
            onChangeCallback(evt);
        } else {
            evt.target.value = value ? parseFloat(value) : '';

            console.log('logseeeetnig value', evt.target.value, parseFloat(value))
            onChangeCallback(createEventLikeObject(evt.target.value,parseFloat(value));
        }
    }, [onChangeCallback]);

    return (
        <TextInput
            value={shownValue}
            unfocusedValue={unfocusedValue}
            onChange={moneyOnChange}
            name={name}
            placeholder={placeholder}
        />
    );
}