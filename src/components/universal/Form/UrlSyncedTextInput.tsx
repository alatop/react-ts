
import React from "react";
import { ChangeEventHandler } from "react";
import TextInput from "./TextInput";
import { History } from 'history';
import { StringKeyObject } from '@app-types';
import queryString from 'query-string';

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    history: History,
    getParamName: string,
    placeholder?: string,
}


export default function UrlSyncedTextInput({
    value, onChange, history, getParamName, placeholder }: TextInputPropsType) {


    const onChangeSelf = React.useCallback((evt) => {

        let params: StringKeyObject = queryString.parse(history.location.search);
        params[getParamName] = evt.target.value;

        console.log('history.location', history.location, params);
        history.replace(history.location.pathname + '?' + queryString.stringify(params));
        if (onChange) onChange(evt);
    }, [onChange, history, getParamName]);

    return (
        <TextInput value={value} onChange={onChangeSelf} placeholder={placeholder} />
    );
}