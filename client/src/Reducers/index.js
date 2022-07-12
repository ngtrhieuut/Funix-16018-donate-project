import { combineReducers } from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import donateReducer from './donateReducer';
import usersReducer from './usersReducer';
import tokenReducer from './tokenReducer';

export const reducers = combineReducers({authReducer, postReducer, donateReducer, usersReducer, tokenReducer});
