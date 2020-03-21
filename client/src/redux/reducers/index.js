import { combineReducers } from 'redux';

import user from './user';
import alerts from './alerts';
import profile from './profile';
import dashboard from './dashboard';
import company from './company';

export default combineReducers({
    user,
    alerts,
    profile,
    dashboard,
    company
});
