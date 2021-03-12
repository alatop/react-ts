
import React from "react";
import { ChangeEventHandler } from "react";

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
    checked: boolean,
    label?: string,
}

export default function ChekboxInput(
    { value, onChange, name,
        placeholder, checked, label }: TextInputPropsType) {


    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const shownValue = value ? value : '';
    const placeholderValue = placeholder ? placeholder : nameValue;
    const labelValue = label ? label : '';


    return (
        <>
            <input
                type="checkbox"
                value={shownValue}
                onChange={onChangeCallback}
                name={nameValue}
                placeholder={placeholderValue}
                checked={checked}
                id={nameValue}
            />
            <label htmlFor={nameValue}>{labelValue}</label>
        </>
    );
}