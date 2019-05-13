import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TaskItemForAuthor from './TaskItemForAuthor';
import { Tabs, Tab } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.maps.coordinates
})
class TasksForAuthor extends React.Component {
    render() {
        const activeList = this.props.tasks.map(item => item.status === 'active' && <TaskItemForAuthor key={item.id} item={item} />);
        const pendingList = this.props.tasks.map(item => item.status === 'pending' && <TaskItemForAuthor key={item.id} item={item} />);
        const archiveList = this.props.tasks.map(item => (item.status === 'completed' || item.status === 'declined') && <TaskItemForAuthor key={item.id} item={item}/>);
        return (
            // !this.props.name ?
            //     <Redirect to='/404' /> :
            <Tabs defaultActiveKey="active" id="uncontrolled-tab-example">
                <Tab eventKey="active" title="Текущие">
                    {pendingList}
                    {activeList}
                </Tab>
                <Tab eventKey="completed" title="Выполненные">
                    {archiveList}
                </Tab>
            </Tabs>
        )
    }
}
export default connect(mapStateToProps)(TasksForAuthor);