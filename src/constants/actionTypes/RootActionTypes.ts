

type RootActionTypesListType = {
    [key: string]: string | null,
}
let RootActionTypes: RootActionTypesListType = {
    SET_GOODS_LIST_DATA: null,
    RESET_GOODS_LIST: null,
    OFF_PRICE_ASCENDING_SORT: null,
    ON_PRICE_ASCENDING_SORT: null,
    OFF_NAME_ASCENDING_SORT: null,
    ON_NAME_ASCENDING_SORT: null,
    SET_FILTERING_BY_NAME_SUBSTR: null,
    SET_FORM_GOODS_ITEM_DATA: null,
    RESET_FORM_GOODS_ITEM_DATA: null,
    EDIT_FORM_GOODS_ITEM_DATA_VALUE: null,
    SET_SAVING_IN_PROCESS: null,
};

for (const key of Object.keys(RootActionTypes)) {
    RootActionTypes[key] = 'ROOT_' + key;
}
RootActionTypes = Object.freeze(RootActionTypes);

export { RootActionTypes };

