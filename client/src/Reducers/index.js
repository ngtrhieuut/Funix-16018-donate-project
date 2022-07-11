import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import donateReducer from './donateReducer';
import usersReducer from './usersReducer';

export const reducers = combineReducers({authReducer, postReducer, donateReducer, usersReducer});
