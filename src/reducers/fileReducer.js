import { OPEN_DIRECTORY, LOAD_FILES, READ_FILE } from '../actions/actionConstants';

const INITIAL_STATE = {
  activeDir: '',
  files: [],      // {name: '', path: ''}
  activeFile: null  // {path: '', content: ''}
};

const fileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_DIRECTORY:
      return { ...state, activeDir: action.payload };
    case LOAD_FILES:
      return { ...state, files: action.payload };
    case READ_FILE:
      return { ...state, activeFile: action.payload };
    default:
      return state;
  }
}

export default fileReducer;