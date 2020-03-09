import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import SkipToMainContentLink from './components/func/SkipToMainContentLink';
import Alert from './components/func/Alert';
import Register from './components/layout/Register/Register';
import Login from './components/layout/Login/Login';

import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <SkipToMainContentLink />
                <Alert />
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </Fragment>
        </Router>
    </Provider>
);
export default App;
