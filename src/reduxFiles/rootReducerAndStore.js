import { combineReducers } from 'redux';
import { Add, Change, Delete } from './Reducers'
import { createStore } from 'redux';

const rootReducer = combineReducers({
    Add, Change, Delete
})

export const store = createStore(rootReducer)