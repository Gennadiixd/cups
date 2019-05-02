import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AddTask from './AddTask';
import UserPage from './UserPage';
import NotFound from './NotFound';

class Main extends React.Component {
    render() {
        return (<main>
            <Switch>
                <Route exact path='/' component={() => <Redirect to="/restaurants" />} />
                {/* <Route path='/user' component={UserPage} /> */}
                <Route path='/add-task' component={AddTask} />
                <Route component={NotFound} />
            </Switch>
        </main>)
    }
}

export default Main;