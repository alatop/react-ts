import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/RootReducer';

const store = createStore(rootReducer,
  applyMiddleware(
    thunkMiddleware,
));

export default store;
