import { UPDATE_EDITOR, READ_FILE } from '../actions/actionConstants';

const INITIAL_STATE = {
  text: `# Welcome\nOpen a folder or write some *markdown* here to get started.`
}

const editorRedcuer = (state = INITIAL_STATE, action) => {
  console.log(state, action)
  switch (action.type) {
    case UPDATE_EDITOR:
      return { ...state, text: action.payload };
    case READ_FILE:
      return { ...state, text: action.payload.content };
    default:
      return state;
  }
}

export default editorRedcuer;