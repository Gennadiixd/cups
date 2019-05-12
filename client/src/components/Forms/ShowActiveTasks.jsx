import React from 'react';
import {connect} from "react-redux";
import {delTaskAC, placeMarksOnMapAC} from "../../reducers/actions/actions";
import { connect } from "react-redux";
import { Card, Button } from 'react-bootstrap';

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks
})


class ShowActiveTasks extends React.Component {
    discardTaskHandler = async (id) => {
        let res = await fetch('/tasks/discardtask', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "id": id,
            })
        })
        this.props.refresh(id);
        alert(await res.text());
    }
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
                            <Button variant="danger" onClick={() => this.discardTaskHandler(task._id)}>Отказаться</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refresh: (id) => dispatch(delTaskAC(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowActiveTasks);
