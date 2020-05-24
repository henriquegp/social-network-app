import { combineReducers } from 'redux';

import systemReducer from './system';
import timelineReducer from './timeline';

const rootReducer = combineReducers({
  system: systemReducer,
  timeline: timelineReducer,
});

export default rootReducer;
