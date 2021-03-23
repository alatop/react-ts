
import React from "react";
import './text-input.css';
import { ChangeEventHandler } from "react";
import { ValidationFromContext } from '../../ValidationFrom';
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
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {

        console.log('--------------errors', errors);
        if (!jswl.isEmpty(errors)) {
            const errorData = jswl.arr.getArrElementByObjectProp(errors,
                'dataPath', '/' + nameValue);
            if (!jswl.isEmpty(errorData)) {

                if (value == errorData.data) {
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
                />
            </div>
            <div className={isError ? 'error-text': 'normal'}>
                {errorText}
            </div> 
        </div>
    );
}