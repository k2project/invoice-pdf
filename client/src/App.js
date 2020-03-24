import React, { Fragment, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import './App.scss';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/user';

import PrivateRoute from './utils/PrivateRoute';
import SkipToMainContentLink from './components/SkipToMainContentLink';
import Alert from './components/alerts/Alert';
import NotFound from './layout/NotFound';
import Register from './layout/Register/Register';
import Login from './layout/Login/Login';
import Profile from './layout/Dashboard/Profile/Profile';
import AddCompany from './layout/Dashboard/AddCompany';
import Company from './layout/Dashboard/Company/Company';
import NewInvoice from './layout/Dashboard/NewInvoice/NewInvoice';
import Account from './layout/Account/Account';

const App = () => {
    //page on refresh
    if (window.location.pathname !== '/') {
        localStorage.setItem('link', window.location.pathname);
    }
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <SkipToMainContentLink />
                    <Alert />
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <PrivateRoute
                            exact
                            path='/account'
                            component={Account}
                        />
                        <PrivateRoute exact path='/dashboard'>
                            <Redirect
                                to={store.getState().global.redirectLink}
                            />
                        </PrivateRoute>

                        <PrivateRoute
                            exact
                            path='/dashboard/profile'
                            component={Profile}
                        />
                        <PrivateRoute
                            exact
                            path='/dashboard/add-company'
                            component={AddCompany}
                        />

                        <PrivateRoute
                            exact
                            path='/dashboard/company/:id'
                            component={Company}
                        />
                        <PrivateRoute
                            exact
                            path='/dashboard/new-invoice'
                            component={NewInvoice}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};
export default App;
