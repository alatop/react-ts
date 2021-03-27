
import React from "react";
import { ChangeEventHandler } from "react";
import jswl from 'js-wrapper-lib';
import TextInput from '../TextInput/TextInput';
import IMask from 'imask';
import { createEventLikeObject } from '@app-universal/helpers/eventHalper';

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

const getFloatValueFromStr = (source: string) => {

    let realValue = null as unknown as number;
    let floatValue = parseFloat(source);
    if (Number.isNaN(floatValue)) {
        let fragments = source.split(".");
        if (fragments && fragments.length === 2) {
            let firstPart = parseInt(fragments[0]);
            if (!Number.isNaN(firstPart)) {
                realValue = firstPart;
            }
        }
    } else {
        realValue = floatValue;
    }

    return realValue;
}

export default function MoneyTextInput(
    { value, onChange, name, placeholder }: MoneyTextInputPropsType) {

    const [unfocusedValue, setUnfocusedValue] = React.useState('');
    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const [shownValue, setShownValue] = React.useState(value);

    React.useEffect(() => {
        if (jswl.isDefined(value)) {
            setUnfocusedValue(moneyMask.resolve(value.toString()));
        }
        setShownValue(value);
    },
        [value, setUnfocusedValue, setShownValue]
    );

    const moneyOnChange = React.useCallback((evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        setShownValue(evt.target.value);
        onChangeCallback(
            createEventLikeObject(name, getFloatValueFromStr(value))
        );

    }, [onChangeCallback]);

    return (
        <TextInput
            value={shownValue}
            unfocusedValue={unfocusedValue}
            onChange={moneyOnChange}
            name={name}
            placeholder={placeholder}
        />

        //     <TextInput
        //     value={value}
        //     unfocusedValue={unfocusedValue}
        //     onChange={moneyOnChange}
        //     name={name}
        //     placeholder={placeholder} 
        // />

        // <TextInput
        // value={value}
        // unfocusedValue={unfocusedValue}
        // onChange={onChange}
        // name={name}
        // placeholder={placeholder} 
        //  />
    );
}