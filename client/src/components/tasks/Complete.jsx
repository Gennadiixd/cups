import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../reducers/actions/actions';
import { Form, Button } from 'react-bootstrap';
import { placeMarksOnMapAC } from "../../reducers/actions/actions";
import { makeTaskPendingAC } from '../../reducers/actions/actions'
import Upload from '../upload/upload/Upload'

class Complete extends React.Component {
    state = {

    }

    submitFormHandler = async (e) => {
        e.preventDefault();
        await fetch('/tasks/complete', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.id,
                report: e.target.elements[0].value,
            })
        })
        this.props.makeTaskPending(this.props.id)
        this.props.close();
    }

    submitLogin = async (e) => {
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitFormHandler}>
                    <Form.Group>
                        <Form.Label>Отчёт</Form.Label>
                        <Form.Control as='textarea' className='noResize' rows='5' type='text-field' required />
                    </Form.Group>                    
                    <Button variant="primary" type='submit'>Подтвердить</Button>
                    <Upload />
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user, tasks) => dispatch(userLogin(user, tasks)),
        placeMarksOnMap: () => dispatch(placeMarksOnMapAC()),
        makeTaskPending: (id) => dispatch(makeTaskPendingAC(id)),
    }
}

export default connect(null, mapDispatchToProps)(Complete)