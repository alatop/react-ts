
import React from "react";
import { ChangeEventHandler } from "react";

type SelectInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
    options: Readonly<Array<any>>,
    valueFieldName: string,
    valueTextFieldName: string,
    defaultValue?: any,
    defaultLabel?: string,
}

export default function RadioButtonGroupInput(
    { value, onChange, name, placeholder, options,
        valueFieldName, valueTextFieldName, defaultValue, defaultLabel }: SelectInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const defaultValueValue = defaultValue ? defaultValue : '';
    const defaultLabelValue = defaultLabel ? defaultLabel : '';
    console.log('----------options', options);

    return (
        <>
            {options.map((option: any, index: number) => {
                let optionValue = option[valueFieldName];
                // console.log('value === optionValue', value, optionValue, value === optionValue);
                return (
                    <div key={index}>
                        <input
                            type="radio"
                            name={nameValue}
                            value={optionValue}
                            id={nameValue}
                            checked={value === optionValue}
                            onChange={onChange}
                        />
                        <label htmlFor={nameValue}>{option[valueTextFieldName]}</label>
                    </div>
                );
            })}


        </>
    );
}