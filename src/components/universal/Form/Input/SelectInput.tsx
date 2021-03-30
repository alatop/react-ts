
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

export default function SelectInput(
    { value, onChange, name, placeholder, options,
        valueFieldName, valueTextFieldName, defaultValue, defaultLabel }: SelectInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const defaultValueValue = defaultValue ? defaultValue : '';
    const defaultLabelValue = defaultLabel ? defaultLabel : '';

    return (
        <select name={nameValue} value={value} onChange={onChangeCallback}>
            <option value={defaultValueValue}>{defaultLabelValue}</option>
            {options.map((option: any, index: number) => {
                let optionValue = option[valueFieldName];
                return (
                    (defaultValueValue !== optionValue) ? <option
                        key={index}
                        value={optionValue}
                    >
                        {option[valueTextFieldName]}
                    </option>
                        : null
                );
            })}
        </select>
    );
}