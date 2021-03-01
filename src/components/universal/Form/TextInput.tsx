
import React from "react";
import { ChangeEventHandler } from "react";

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
}

export default function TextInput(props: TextInputPropsType) {
    const { value, onChange } = props;

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;

    return (
        <input value={value} onChange={onChangeCallback} />
    );
}