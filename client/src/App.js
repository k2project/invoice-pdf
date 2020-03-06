import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

import Alert from './components/func/Alert';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register/Register';
import Login from './components/layout/Login/Login';

import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Alert />
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                </Switch>
            </Fragment>
        </Router>
    </Provider>
);
export default App;
