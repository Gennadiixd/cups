import React from 'react';
import { Switch, Route} from 'react-router-dom';
import TakeTask from '../components/TakeTask'

export default class HashRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/tasks/:id'  component = {TakeTask}  />            
            </Switch>
        )
    }
}
