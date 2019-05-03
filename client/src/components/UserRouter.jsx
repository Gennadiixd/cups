import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import UserPage from './UserPage';
import UserPageEdit from './UserPageEdit';

const UserRouter = () => (
    <Switch>
        <Route path='/user/:id/edit' component={UserPageEdit} />
        <Route path='/user/:id' component={UserPage} />
        <Route component={NotFound} />
    </Switch>
)

export default UserRouter;