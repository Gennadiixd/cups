import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../reducers/actions/actions';
import { Form, Button } from 'react-bootstrap';

class Login extends React.Component {
    state = {
        validated : false,
        message : ''
    }

    submitFormHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({validated: true})
        } else
            this.submitLogin(e)
    }

    submitLogin = async (e) => {
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
        if (!res.message) {
            this.props.login(res.name, res.role, res.tasks)
            this.props.close();
        }
        else this.setState({message : res.message})
    }

    render () {
        const {validated} = this.state;
        return (
            <div>
                <Form noValidate validated={validated} onSubmit={this.submitFormHandler}>
                    <Form.Text style={{color : 'red'}}>{this.state.message}</Form.Text>
                    <Form.Group>
                    <Form.Label>Почта</Form.Label>
                    <Form.Control type='email' required/>
                    <Form.Control.Feedback type='invalid'>Введите почту</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control type='password' required/>
                    <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="primary" type='submit'>Войти</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (n, r, tasks) => dispatch(userLogin(n, r, tasks))
    }
}

export default connect(null, mapDispatchToProps)(Login)