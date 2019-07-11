import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import fileReducer from './fileReducer';

export default combineReducers({
  editor: editorReducer,
  directory: fileReducer
});