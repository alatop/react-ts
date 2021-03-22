
import React from "react";
import { ReactEventHandler } from "react";
import Ajv from 'ajv';

type ValidationFromPropsType = {
    children: React.ReactNode,
    onSubmit: ReactEventHandler,
    data: any,
}

export default function ValidationFrom(
    { children, onSubmit, data }: ValidationFromPropsType) {


    const onSubmitSelf = React.useCallback((evt) => {
        evt.preventDefault();
        let ajv = new Ajv({ allErrors: true, verbose: true });
        console.log('------------data', data);
        let validate = ajv.compile(
            {
                type:"object",
                "properties": {
                    "name": { type: "integer" },
                }
            }
        ); 
        let valid = validate(data);

        if (valid) { 
            console.log('Valid!');
            // onSubmit(evt);
        } else {
            console.log('Invalid: ' + ajv.errorsText(validate.errors), validate.errors);
        }

    }, [onSubmit, data]);

    return (
        <form onSubmit={onSubmitSelf}>
            {children}
        </form>
    );
}