

let RootActionTypes = {
    SET_GOODS_LIST_DATA: null,
};

for (const key of Object.keys(RootActionTypes)) { // было const [key]
    RootActionTypes[key] = 'ROOT_' + key;
}
RootActionTypes = Object.freeze(RootActionTypes);

export { RootActionTypes };

