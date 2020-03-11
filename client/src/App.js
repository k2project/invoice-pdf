import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import SkipToMainContentLink from './components/func/SkipToMainContentLink';
import Alert from './components/func/Alert';
import Register from './components/layout/Register/Register';
import Login from './components/layout/Login/Login';
import Profile from './components/layout/Profile/Profile';

import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/actions/auth';

const App = () => {
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
                        <Route exact path='/dashboard' component={Profile} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};
export default App;
