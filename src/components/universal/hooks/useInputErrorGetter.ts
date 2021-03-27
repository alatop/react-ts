import React from "react";
import jswl from 'js-wrapper-lib';

export default function useInputErrorGetter(
    name: string, value: any, errors: Array<any>,) {


    const [errorText, setErrorText] = React.useState('');
    const [isError, setIsError] = React.useState(false);

    React.useEffect(() => {
        if (!jswl.isEmpty(errors)) {
            console.log('--------------errors', errors);
            const errorData = jswl.arr.getArrElementByObjectProp(errors,
                'dataPath', '/' + name);
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
                    'params.missingProperty', name);

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
        [errors, setErrorText, name, value]
    );

    return [isError, errorText];
}