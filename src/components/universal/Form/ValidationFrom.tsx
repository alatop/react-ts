
import React from "react";
import { ReactEventHandler } from "react";
import Ajv from 'ajv';

type ValidationFromPropsType = {
    children: React.ReactNode,
    onSubmit: ReactEventHandler,
    data: any,
}

const defaultErrorsState: any = {};
export const ValidationFromContext = React.createContext(defaultErrorsState);


export default function ValidationFrom(
    { children, onSubmit, data }: ValidationFromPropsType) {


    const [errors, setErrors] = React.useState(defaultErrorsState);

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
            setErrors(validate.errors);
        }

    }, [onSubmit, data, setErrors]);

    return (
        <ValidationFromContext.Provider value={errors}>
        <form onSubmit={onSubmitSelf}>
            {children}
        </form>
        </ValidationFromContext.Provider>
    );
}