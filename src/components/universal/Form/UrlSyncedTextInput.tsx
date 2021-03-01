
import React from "react";
import { ChangeEventHandler } from "react";
import TextInput from "./TextInput";

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
}

export default function UrlSyncedTextInput(props: TextInputPropsType) {
    const { value, onChange } = props;

    return (
        <TextInput value={value} onChange={onChange} />
    );
}