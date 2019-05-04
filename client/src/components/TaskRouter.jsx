import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
// import TaskAdd from './TaskAdd';
// import TaskPage from './TaskPage';
// import TaskPageEdit from './TaskPageEdit';

const TaskRouter = () => (
    <Switch>
        {/* <Route path='/tasks/:id/edit' component={TaskPageEdit} /> */}
        {/* <Route path='/tasks/:id' component={TaskPage} /> */}
        {/* <Route path='/tasks/new' component={TaskAdd} /> */}
        {/* <Route path='/tasks' component={TaskList} /> */}
        <Route component={NotFound} />
    </Switch>
)

export default TaskRouter;