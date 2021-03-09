
import React from "react";
import { ChangeEventHandler } from "react";

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
}

export default function TextInput(props: TextInputPropsType) {
    const { value, onChange, name, placeholder } = props;

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const shownValue = value ? value : ''; 
    const placeholderValue = placeholder ? placeholder :  nameValue; 

    return (
        <input
            value={shownValue}
            onChange={onChangeCallback}
            name={nameValue}
            placeholder={placeholderValue}
        />
    );
}