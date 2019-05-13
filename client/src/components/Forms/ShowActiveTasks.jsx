import React from 'react';
import { connect } from "react-redux";
import { delTaskAC } from "../../reducers/actions/actions";
import { Card, Button, Modal } from 'react-bootstrap';
import Complete from '../../components/tasks/Complete'

const mapStateToProps = (state, ownProps) => ({
    name: state.auth.name,
    tasks: state.auth.tasks,    
})

class ShowActiveTasks extends React.Component {
    state = {
        showComplete: false,
        taskid: '',
    }

    //Отказ от выполнения задания
    discardTaskHandler = async (id, task) => {
        //Запрос на удаление исполнителя из базы данных
        await fetch('/tasks/discardtask', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": id,
            })
        })
        this.props.refresh(id, task); //Занесение данных в redux
    }

    handleCloseComplete = () => {
        this.setState({ showComplete: false })
    }

    handleShow = (id) => {
        this.setState({showComplete: true})
        this.setState({taskid: id})
    }
  
    render() {
        let notPendingTasks = this.props.tasks.filter( (task) => task.status !== 'pending')
        notPendingTasks = notPendingTasks.filter( (task) => task.status !== 'completed')
        return (
            <div className="task col-lg-4">
                {notPendingTasks.length !== 0 ?
                    <h5 style={{ textAlign: 'center' }}>Текущие задания</h5>
                    : <h5 style={{ textAlign: 'center' }}>У вас нет активных заданий</h5>}
                <br />
                {notPendingTasks.map((task, index) =>
                    <Card key={task._id + task.title}>
                        <Card.Header as="h5">{index + 1}. {task.title}</Card.Header>
                        <Card.Body>
                            <Card.Text>{task.description}</Card.Text>
                            <Button variant="primary" onClick={() => this.handleShow(task._id)}>Выполнить</Button>
                            <Button variant="danger" onClick={() => this.discardTaskHandler(task._id, task)}>Отказаться</Button>
                        </Card.Body>
                    </Card>
                )}
                
                <Modal show={this.state.showComplete} onHide={this.handleCloseComplete}>
                    <Modal.Header className="modals" style={{ background: 'rgba(59,89,153 ,1 )' }} closeButton>
                        <Modal.Title>Завершение</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><Complete id={this.state.taskid} close={this.handleCloseComplete} /></Modal.Body>
                </Modal>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        refresh: (id, task) => dispatch(delTaskAC(id, task)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowActiveTasks);
