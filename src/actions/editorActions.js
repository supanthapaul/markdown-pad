import { UPDATE_EDITOR } from './actionConstants';

export const updateEditor = (text) => ({
  type: UPDATE_EDITOR,
  payload: text
});