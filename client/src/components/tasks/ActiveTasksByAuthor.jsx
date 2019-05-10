import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import TaskItem from './TaskItem';
import { Tabs, Tab } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    role: state.auth.role
})
class ActiveTasksByAuthor extends React.Component {
    state = {
        activeTasks: [],
        completedTasks: []
    }
    async componentDidMount() {
        let response = await fetch(this.props.match.url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.props.name,
                role: this.props.role
            })
        });
        let result = await response.json();
        console.log(result);
        await this.setState({
            activeTasks: result.active,
            completedTasks: result.completed
        });
    }
    render() {
        const activeList = this.state.activeTasks.map(item => <TaskItem key={item._id} item={item} />);
        const completedList = this.state.completedTasks.map(item => <TaskItem key={item._id} item={item} />)
        return (
            !this.props.name ?
                <Redirect to='/404' /> :
                <Tabs defaultActiveKey="active" id="uncontrolled-tab-example">
                    <Tab eventKey="active" title="Текущие">
                        {activeList}
                    </Tab>
                    <Tab eventKey="completed" title="Выполненные">
                        {completedList}
                </Tab>
                </Tabs>
        )
    }
}
export default connect(mapStateToProps)(ActiveTasksByAuthor);