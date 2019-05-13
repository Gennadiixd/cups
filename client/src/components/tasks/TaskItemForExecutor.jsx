import React from "react";
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { changeTaskStatusAC } from '../../reducers/actions/actions';

function TaskItemForExecutor(props) {
    //let props = this.props
    const changeStatus = async (newStatus) => {
        // const {props} = this
        await fetch(`tasks/${props.item.id}`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                status: newStatus
            })
        });
    }
    const handleClick = (id, status) => {
        // const {props, changeStatus} = this
        changeStatus(status);
        props.changeStatusStore(id, status);
    }
    // const {props, footerRender} = this
    return (
        <Jumbotron fluid style={{ padding: '10px', marginBottom: '5px' }}>
            <Container>
                <h2>{props.item.title}</h2>
                <p>{props.item.description}</p>
                <p>{props.item.status}</p>
                {props.item.status === 'pending' && <Button variant="primary" onClick={() => handleClick(props.item.id, 'active')}>Переделать</Button>}
            </Container>
        </Jumbotron >
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatusStore: (id, status) => dispatch(changeTaskStatusAC(id, status))
    }
}

export default connect(null, mapDispatchToProps)(TaskItemForExecutor);