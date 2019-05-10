import React from 'react';
import { connect } from "react-redux";
import { Card, Button } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks
})

class ShowActiveTasks extends React.Component {
    async handleClick(id) {
        // console.log(event.target)
        let response = await fetch('/tasks/send', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id,
            })
        })
    }
    render() {
        return (
            <div className="task col-lg-4">
                {this.props.tasks.length !== 0 ?
                    <h5 style={{ textAlign: 'center' }}>Текущие задания</h5>
                    : <h5 style={{ textAlign: 'center' }}>У вас нет активных заданий</h5>}
                <br />
                {this.props.tasks.map((task, index) =>
                    <Card>
                        <Card.Header as="h5">{index + 1}. {task.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>{task.description}</Card.Text>
                            <Button variant="primary" onClick={() => this.handleClick(task._id)}>Выполнено</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ShowActiveTasks);
