import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
import TakeTask from '../components/TakeTask'

export default class HashRouter extends React.Component {
    render() {
        return (
            <Switch>                
                <Route path='/:id'  component = {TakeTask}  />            
            </Switch>
        )
    }
}