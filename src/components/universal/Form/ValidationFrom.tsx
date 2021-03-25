
import React from "react";
import { ReactEventHandler } from "react";
import Ajv from 'ajv';
import addFormats from "ajv-formats";
import { StringKeyObject } from '@app-types';
import jswl from 'js-wrapper-lib';

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
let defaultRefsValue: StringKeyObject = {};

const defaultErrorsState: any = [];
export const ValidationFromContext = React.createContext(defaultErrorsState);


export default function ValidationFrom(
    { children, onSubmit, data }: ValidationFromPropsType) {

    const filedsRefs = React.useRef(defaultRefsValue);
    const setRef = React.useCallback((el, name) => {
        filedsRefs.current[name] = el;
    }, [filedsRefs]);

    const [errors, setErrors] = React.useState(defaultErrorsState);
    const validationProviderValue = React.useMemo(() => {
        return {
            errors,
            setRef
        }
    },
        [errors, setRef]
    );

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


    React.useEffect(() => {
        const first = errors[0];
        let name = null;
        if (errors[0]) {
            if (!jswl.isEmpty(first.dataPath)) {
                name = jswl.str.removePrefixIfExists(first.dataPath, '/');
            } else if (!jswl.isEmpty(first.params.missingProperty)) {
                name = first.params.missingProperty;
            }
        }
        if (name) {
            filedsRefs.current[name].focus();
        }
    },
        [errors, filedsRefs]
    );

    return (
        <ValidationFromContext.Provider value={validationProviderValue}>
            <form onSubmit={onSubmitSelf}>
                {children}
            </form>
        </ValidationFromContext.Provider>
    );
}