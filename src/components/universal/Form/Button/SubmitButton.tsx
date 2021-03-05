
import React from "react";


type SubmitButtonPropsType = {
    text?: any,
    disabled?: boolean,
}


export default function SubmitButton(
    { text, disabled }: SubmitButtonPropsType) {


    const textValue = text ? text : 'noname';
    const disabledValue = disabled ? true : false;

    return (
        <button
            type="submit"
            disabled={disabledValue}
        >
            {textValue}
        </button>
    );
}