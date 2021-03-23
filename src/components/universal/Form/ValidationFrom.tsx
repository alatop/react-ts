
import React from "react";
import { ReactEventHandler } from "react";
import Ajv from 'ajv';
import addFormats from "ajv-formats";

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

ajv.addKeyword('isNotEmpty', {
    keyword: 'string',
    validate: function (schema: any, data: any) { 
        return typeof data === 'string' && data.trim() !== ''
    },
    errors: false,
    error: {
        message: "Значение не должно состоять из одних пробелов"
    }
});

const validate = ajv.compile(
    {
        type: "object",
        "properties": {
            "name": {
                type: "string",
                maxLength: 15,
                "isNotEmpty": true,
            },
            "email": { type: "string", format: "email" },
            "count": { type: "number", },
        },
        required: ["name"]
    }
);

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

        let valid = validate(data);
        if (valid) {
            console.log('Valid!');
            onSubmit(evt);
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