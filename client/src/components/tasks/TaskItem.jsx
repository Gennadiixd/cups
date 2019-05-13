import React from "react";
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { changeTaskStatusAC } from '../../reducers/actions/actions';

function TaskItem(props) {
    const changeStatus = async (newStatus) => {
        let response = await fetch(`tasks/${props.item._id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: newStatus
            })
        });
    }
    return (
        <div>
            <Jumbotron fluid style={{ padding: '10px', 'margin-bottom': '5px' }}>
                <Container>
                    <h1>{props.item.title}</h1>
                    <p>{props.item.description}</p>
                    <p>Выполнить не позднее {props.item.prettyDate}</p>
                    <p>{props.item.status}</p>
                    {props.item.status === 'active' &&
                        <Button variant="secondary" onClick={() => {
                            changeStatus('declined');
                            props.changeStatusStore(props.item._id, 'declined')
                        }}>Отменить</Button>}
                    {props.item.status === 'pending' &&
                        <ButtonToolbar>
                            <Button variant="secondary" onClick={() => changeStatus('declined')}>Отклонить</Button>
                            <Button variant="primary" onClick={() => changeStatus('completed')}>Принять</Button>
                            <Button variant='success'>Связаться с исполнителем</Button>
                        </ButtonToolbar>}
                    {(props.item.status === 'completed' || props.item.status === 'declined') &&
                        <Button variant="secondary" onClick={() => changeStatus('active')}>Повторить</Button>}
                </Container>
            </Jumbotron>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        changeStatusStore: (id, status) => dispatch(changeTaskStatusAC(id, status))
    }
}

export default connect(null, mapDispatchToProps)(TaskItem);