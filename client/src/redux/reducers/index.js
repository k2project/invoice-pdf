import { combineReducers } from 'redux';

import global from './global';
import alerts from './alerts';
import user from './user';
import profile from './profile';
import dashboard from './dashboard';
import company from './company';

export default combineReducers({
    global,
    alerts,
    user,
    profile,
    dashboard,
    company
});
