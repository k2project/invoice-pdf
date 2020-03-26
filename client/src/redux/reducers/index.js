import { combineReducers } from 'redux';

import global from './global';
import alerts from './alerts';
import user from './user';
import profile from './profile';
import companies from './companies';

export default combineReducers({
    global,
    alerts,
    user,
    profile,
    companies
});
