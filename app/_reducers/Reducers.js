import { combineReducers } from 'redux';

import user from './UserReducer';
import bill from './BillReducer';
import tipsAndTricks from './TipsAndTricksReducer';

export default echonomia = combineReducers({
  user,
  bill,
  tipsAndTricks,
});