import { combineReducers } from 'redux';

import user from './UserReducer';
import bill from './BillReducer';
import tipsAndTricks from './TipsAndTricksReducer';
import question from './QuestionReducer';

export default echonomia = combineReducers({
  user,
  bill,
  tipsAndTricks,
  question,
});