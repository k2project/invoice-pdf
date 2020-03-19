import { combineReducers } from 'redux';

import auth from './auth';
import alerts from './alerts';
import profile from './profile';
import dashboard from './dashboard';

export default combineReducers({
    auth,
    alerts,
    profile,
    dashboard
});
