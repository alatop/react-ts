
import React from "react";
import { ChangeEventHandler } from "react";
import { ValidationFromContext } from '../ValidationFrom';
import jswl from 'js-wrapper-lib';

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
    const placeholderValue = placeholder ? placeholder : nameValue;
    const errors = React.useContext(ValidationFromContext);

    const [errorText, setErrorText] = React.useState('');

    React.useEffect(() => {

        console.log('--------------errors', errors);
        if (!jswl.isEmpty(errors)) {
            setErrorText('У нас проблемы!');
        }

    },
        [errors, setErrorText]
    );

    return (
        <>
            <input
                value={shownValue}
                onChange={onChangeCallback}
                name={nameValue}
                placeholder={placeholderValue}
            />
            {errorText}
        </>
    );
}