import React from 'react'
import {connect} from 'react-redux'
import {userLogin} from '../../reducers/actions/actions'
import {Form, Button, Row, Col} from 'react-bootstrap';
import FormGroup from "react-bootstrap/es/FormGroup";

const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

class SignUp extends React.Component {
    state = {
        validated: false,
        role : ''
    }

    submitFormHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({validated: true})
        } else
            this.submitSignUp(e)
    }

    submitSignUp = async (e) => {
        let [name, mail, password] = e.target.elements;
        let res = await fetch('/users/signup', {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                "name" : name.value,
                "password" : password.value,
                "email" : mail.value,
                "role" : this.state.role
            })
        });
        res = await res.json();
        !res.message ?
            this.props.login(name.value, res.role)
            : alert(res.message);
        this.props.close();
    }

    render() {
        const {validated} = this.state;
        return (
            <div>
                <Form noValidate  validated={validated} onSubmit={this.submitFormHandler}>
                    <FormGroup>
                        <Form.Label>Логин</Form.Label>
                        <Form.Control type='text' required/>
                        <Form.Control.Feedback type='invalid'>Введите логин</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type='email' required/>
                        <Form.Control.Feedback type='invalid'>Адрес электронной почты - обязателен</Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password' required/>
                        <Form.Control.Feedback type='invalid'>Введите пароль</Form.Control.Feedback>
                    </FormGroup>

                    <FormGroup as={Row}>
                        <Col sm={6}>
                            <Form.Check onChange={() => this.setState({role : 'worker'})} type='radio' name='role' label='Я - Исполнитель' required/>
                        </Col>
                        <Col sm={6}>
                            <Form.Check onChange={() => this.setState({role : 'customer'})} type='radio' name='role' label='Я - Работодатель'/>
                        </Col>
                    </FormGroup>
                    <Button variant="success" type='submit'>Зарегистрироваться</Button>
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)