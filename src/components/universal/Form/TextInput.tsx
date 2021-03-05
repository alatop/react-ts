
import React from "react";
import { ChangeEventHandler } from "react";

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
}

export default function TextInput(props: TextInputPropsType) {
    const { value, onChange, name } = props;

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const shownValue = value ? value : ''; 

    return (
        <input
            value={shownValue}
            onChange={onChangeCallback}
            name={nameValue}
        />
    );
}