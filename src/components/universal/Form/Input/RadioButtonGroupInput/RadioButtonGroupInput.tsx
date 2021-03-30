
import React from "react";
import { ChangeEventHandler } from "react";
import './radio-button-list.css';
import useInputErrorGetter from '@app-universal/hooks/useInputErrorGetter';
import { ValidationFromContext } from '../../ValidationFrom';

type SelectInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
    options: Readonly<Array<any>>,
    valueFieldName: string,
    valueTextFieldName: string,
    defaultValue?: any,
    defaultLabel?: string,
}

export default function RadioButtonGroupInput(
    { value, onChange, name, placeholder, options,
        valueFieldName, valueTextFieldName, defaultValue, defaultLabel }: SelectInputPropsType) {

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';

    const validationContext = React.useContext(ValidationFromContext);
    const errors = React.useMemo(() => {
        return validationContext ? validationContext.errors : []
    },
        [validationContext]
    );
    const [isError, errorText] = useInputErrorGetter(nameValue, value, errors);
    const inputClassName = React.useMemo(() => {
        return isError ? 'error-list' : 'normal';

    }, [isError]);


    return (
        <div className={inputClassName}>
            {options.map((option: any, index: number) => {
                let optionValue = option[valueFieldName];
                return (
                    <div key={index}>
                        <input
                            type="radio"
                            name={nameValue}
                            value={optionValue}
                            id={nameValue}
                            checked={value === optionValue}
                            onChange={onChangeCallback}
                        />
                        <label htmlFor={nameValue}>{option[valueTextFieldName]}</label>
                    </div>
                );
            })}
            <div className={isError ? 'error-text' : 'normal'}>
                {errorText}
            </div>
        </div>
    );
}