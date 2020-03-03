import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Landing from './components/layout/Landing';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
const App = () => (
    <Router>
        <Fragment>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </Fragment>
    </Router>
);
export default App;
