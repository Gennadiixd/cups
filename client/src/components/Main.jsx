import React from 'react';
import { Switch, Route } from 'react-router-dom';
import YandexMaps from '../containers/YandexMaps/YandexMaps';
import UserRouter from './UserRouter';
// import TaskRouter from './TaskRouter';
import NotFound from './NotFound';

class Main extends React.Component {
    render() {
        return (<main>
            <Switch>
                <Route exact path='/' component={YandexMaps} />
                <Route path='/users' component={UserRouter} />
                {/* <Route path='/tasks' component={TaskRouter} /> */}
                {/* <Route path='/:id'  component = {TakeTask}  /> */}
                <Route component={NotFound} />
            </Switch>
        </main>)
    }
}

export default Main;