import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import CompletedTasksByExecutor from './tasks/CompletedTasksByExecutor';
// import UserPageEdit from './UserPageEdit';

const UserRouter = () => (
    <Switch>
        {/* <Route path='/users/:id/edit' component={UserPageEdit} /> */}
        <Route path='/users/:id' component={CompletedTasksByExecutor} />
        <Route component={NotFound} />
    </Switch>
)

export default UserRouter;