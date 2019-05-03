import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import TaskAdd from './TaskAdd';
import TaskPage from './TaskPage';
import TaskPageEdit from './TaskPageEdit';

const TaskRouter = () => (
    <Switch>
        <Route path='/task/:id/edit' component={TaskPageEdit} />
        <Route path='/task/:id' component={TaskPage} />
        <Route path='/task/new' component={TaskAdd} />
        {/* <Route path='/tasks' component={TaskList} /> */}
        <Route component={NotFound} />
    </Switch>
)

export default TaskRouter;