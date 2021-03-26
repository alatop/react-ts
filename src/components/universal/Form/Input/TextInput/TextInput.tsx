
import React from "react";
import './text-input.css';
import { ChangeEventHandler } from "react";
import { ValidationFromContext } from '../../ValidationFrom';
import jswl from 'js-wrapper-lib';

type TextInputPropsType = {
    value?: any,
    unfocusedValue?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
}

export default function TextInput(
    { value, onChange, name, placeholder, unfocusedValue }: TextInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';
    const placeholderValue = placeholder ? placeholder : nameValue;
    const validationContext = React.useContext(ValidationFromContext);
    const [focused, setFocused] = React.useState(false);

    const realValueView = value ? value : '';
    
    const shownValue = focused ? realValueView
        : (unfocusedValue ? unfocusedValue : realValueView);

    const errors = React.useMemo(() => {
        return validationContext ? validationContext.errors : []
    },
        [validationContext]
    );

    const setRefCallback = React.useCallback((el: any, name: string) => {
        if (validationContext && validationContext.setRef) {
            validationContext.setRef(el, name);
        }
    }, [validationContext]);

    const markFocused = React.useCallback(() => {
        setFocused(true);
    }, [setFocused]);
    const markUnfocused = React.useCallback(() => {
        setFocused(false);
    }, [setFocused]);

    const setSefRef = React.useCallback((el) => {
        setRefCallback(el, nameValue);
    }, [setRefCallback, nameValue]
    );

    const [errorText, setErrorText] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {

        console.log('--------------errors', errors);
        if (!jswl.isEmpty(errors)) {
            const errorData = jswl.arr.getArrElementByObjectProp(errors,
                'dataPath', '/' + nameValue);
            if (!jswl.isEmpty(errorData)) {

                if (value === errorData.data) {
                    setErrorText(errorData.message ?
                        'Ошибка: ' + errorData.message : 'Ошибка');
                    setIsError(true);

                } else {
                    setIsError(false);
                    setErrorText('');
                }
            } else { // для required
                const errorData = jswl.arr.getArrElementByObjectProp(errors,
                    'params.missingProperty', nameValue);

                if (!jswl.isEmpty(errorData) && (jswl.isEmpty(value))) {
                    setErrorText(errorData.message ?
                        'Ошибка: ' + errorData.message : 'Ошибка');
                    setIsError(true);
                } else {
                    setIsError(false);
                    setErrorText('');
                }
            }
        }
    },
        [errors, setErrorText, nameValue, value]
    );

    console.log('isError', isError);
    const inputClassName = React.useMemo(() => {
        return isError ? 'error-input' : 'normal';

    }, [isError]);

    return (
        <div>
            <div>
                <input
                    className={inputClassName}
                    value={shownValue}
                    onChange={onChangeCallback}
                    name={nameValue}
                    placeholder={placeholderValue}
                    ref={setSefRef}
                    onBlur={markUnfocused}
                    onFocus={markFocused}
                />
            </div>
            <div className={isError ? 'error-text' : 'normal'}>
                {errorText}
            </div>
        </div>
    );
}