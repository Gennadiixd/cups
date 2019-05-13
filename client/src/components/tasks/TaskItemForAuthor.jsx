import React from "react";
import { connect } from 'react-redux';
import { Jumbotron, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { changeTaskStatusAC } from '../../reducers/actions/actions';

function TaskItemForAuthor(props) {
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
    const footerRender = () => {
        // const {props, handleClick} = this
        switch (props.item.status) {
            case 'active':
                return (<Button variant="secondary" onClick={() => handleClick(props.item.id, 'declined')}>Отменить</Button>)
            case 'pending':
                console.log(props.item.executor)
                return (
                    <ButtonToolbar>
                        <Button variant="secondary" onClick={() => handleClick(props.item.id, 'declined')}>Отклонить</Button>
                        <Button variant="primary" onClick={() => handleClick(props.item.id, 'completed')}>Принять</Button>
                        <Button variant='success'>Связаться с исполнителем</Button>
                    </ButtonToolbar>
                )
            case 'completed':
            case 'declined':
                return (<Button variant="secondary" onClick={() => handleClick(props.item.id, 'active')}>Повторить</Button>);
        }
    }
    // const {props, footerRender} = this
    return (
        <Jumbotron fluid style={{ padding: '10px', marginBottom: '5px' }}>
            <Container>
                <h2>{props.item.title}</h2>
                <p>{props.item.description}</p>
                {/* <p>Завершить не позднее {props.item.prettyDate}</p> */}
                {footerRender()}
            </Container>
        </Jumbotron>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        changeStatusStore: (id, status) => dispatch(changeTaskStatusAC(id, status))
    }
}

export default connect(null, mapDispatchToProps)(TaskItemForAuthor);