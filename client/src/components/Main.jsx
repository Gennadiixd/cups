import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TaskMap from './TaskMap';
import Login from './Login';
import Signup from './Signup';
import UserRouter from './UserRouter';
import TaskRouter from './TaskRouter';
import NotFound from './NotFound';

class Main extends React.Component {
    render() {
        return (<main>
            <Switch>
                <Route exact path='/' component={TaskMap} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/user' component={UserRouter} />
                <Route path='/task' component={TaskRouter} />
                <Route component={NotFound} />
            </Switch>
        </main>)
    }
}

export default Main;