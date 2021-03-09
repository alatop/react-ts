
import React from "react";
import { ChangeEventHandler } from "react";

type SelectInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
    options: Array<any>,
    valueFieldName: string,
    valueTextFieldName: string,
}

export default function SelectInput(
    { value, onChange, name, placeholder, options, valueFieldName, valueTextFieldName }: SelectInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const shownValue = value ? value : '';
    const placeholderValue = placeholder ? placeholder : nameValue;

    return (
        <select name={name}>
            {options.map((option, index) => {
                let optionValue = option[valueFieldName];
                return (
                    <option
                        value={option[valueFieldName]}
                        selected={(value === optionValue) ? true : false}
                    >
                        {option[valueTextFieldName]}
                    </option>);
            })}
        </select>
    );
}