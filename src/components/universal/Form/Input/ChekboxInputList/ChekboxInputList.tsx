
import React from "react";
import './checkbox-list-css.css';
import { ChangeEventHandler } from "react";
import ChekboxInput from '../ChekboxInput';
import jswl from 'js-wrapper-lib';
import useInputErrorGetter from '@app-universal/hooks/useInputErrorGetter';
import { ValidationFromContext } from '../../ValidationFrom';

type TextInputPropsType = {
    value?: any,
    onChange?: ChangeEventHandler,
    name?: string,
    placeholder?: string,
    options: Readonly<Array<any>>,
    valueFieldName: string,
    valueTextFieldName: string,
}

export default function ChekboxInputList(props: TextInputPropsType) {
    const { value, onChange, name,
        options, valueFieldName, valueTextFieldName } = props;

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
            <div>
                {options.map((option: any, index: number) => {
                    let optionValue = option[valueFieldName];
                    // console.log('value === optionValue', value, optionValue, value === optionValue);
                    let checked = Array.isArray(value) ?
                        jswl.arr.inArray(optionValue, value) : false;
                    return (
                        <div key={index}>
                            <ChekboxInput
                                name={nameValue}
                                value={optionValue}
                                checked={checked}
                                onChange={onChangeCallback}
                                label={option[valueTextFieldName]}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={isError ? 'error-text' : 'normal'}>
                {errorText}
            </div>
        </div>
    );
}