
import React from "react";
import { ChangeEventHandler } from "react";
import ChekboxInput from './ChekboxInput';

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
        placeholder, options, valueFieldName, valueTextFieldName } = props;

    const defaultOnChange = React.useCallback(() => { }, []);
    const onChangeCallback = onChange ? onChange : defaultOnChange;
    const nameValue = name ? name : 'noname';

    return (
        <>
            {options.map((option: any, index: number) => {
                let optionValue = option[valueFieldName];
                console.log('value === optionValue', value, optionValue, value === optionValue);
                return (
                    <div key={index}>
                        <ChekboxInput
                            name={nameValue}
                            value={optionValue}
                            checked={value == optionValue}
                            onChange={onChangeCallback}
                            label={option[valueTextFieldName]}
                        />
                    </div>
                );
            })}


        </>
    );
}