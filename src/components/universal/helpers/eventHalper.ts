import { StringKeyObject } from '@app-types';

export const createEventLikeObject =
    (name: string, value: any = '', dataset: StringKeyObject = {}) => {
        return {
            target: {
                name: name,
                value: value,
                dataset: dataset,
            }
        }
    };