import { combineReducers } from 'redux';
export { default as systemsTableActions } from './actions';
import systemsTableReducer from './systemsTableReducer';

export const systemsTableRootReducer = combineReducers({
    RosTable: systemsTableReducer()
});
