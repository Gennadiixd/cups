import React from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../../reducers/actions/actions';
import {Form, Button} from 'react-bootstrap';

class Login extends React.Component {

    submitFormHandler = async (e) => {
        e.preventDefault()
            let [mail, password] = e.target.elements;
            let res = await fetch('/users/login', {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "password": password.value,
                    "email": mail.value
                })
            });
            res = await res.json();
            if (!res.message)
            this.props.login(res.name, res.role)
            else alert(res.message)
        this.props.close();
    }

    render () {
        return (
            <div>
                <Form onSubmit={this.submitFormHandler}>
                    <Form.Group>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type='email'/>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password'/>
                    </Form.Group>
                    <Button variant="success" type='submit'>Войти</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (n,r) => dispatch(userLogin(n,r))
    }
}

export default connect(null, mapDispatchToProps)(Login)