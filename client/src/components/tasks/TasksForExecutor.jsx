import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import TaskItemForExecutor from './TaskItemForExecutor';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks
})
class TasksForExecutor extends React.Component {
    // async componentDidMount() {
    //     console.log(this.props.match.url)
    //     let response = await fetch(this.props.match.url, {
    //         method: 'post',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //             role: this.props.role
    //         })
    //     });
    //     let completedArr = await response.json();
    //     console.log(completedArr);
    // }
    render() {
        const pendingList = this.props.tasks.map(item => item.status === 'pending' && <TaskItemForExecutor key={item.id} item={item} />);
        const completedList = this.props.tasks.map(item => item.status === 'completed' && <TaskItemForExecutor key={item.id} item={item} />);
        console.log('list', pendingList)
        return (
            // !this.state.user ?
            //     <Redirect to='/404' /> :
            <Tabs defaultActiveKey="active" id="uncontrolled-tab-example">
                <Tab eventKey="active" title="На проверке">
                    {pendingList}
                </Tab>
                <Tab eventKey="completed" title="Выполненные">
                    {completedList}
                </Tab>
            </Tabs>
        )
    }
}
export default connect(mapStateToProps)(TasksForExecutor);