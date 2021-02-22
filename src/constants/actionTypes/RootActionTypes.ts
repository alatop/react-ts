

type RootActionTypesListType = {
    [key: string]: string | null,
}
let RootActionTypes: RootActionTypesListType = {
    SET_GOODS_LIST_DATA: null,
    RESET_GOODS_LIST: null
};

for (const key of Object.keys(RootActionTypes)) {
    RootActionTypes[key] = 'ROOT_' + key;
}
RootActionTypes = Object.freeze(RootActionTypes);

export { RootActionTypes };

