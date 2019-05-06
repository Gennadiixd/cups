import React from 'react'
import {connect} from 'react-redux'
import {userLogin} from '../../reducers/actions/actions'
import {Form, Button} from 'react-bootstrap';
import FormGroup from "react-bootstrap/es/FormGroup";

const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

class SignUp extends React.Component {
    submitFormHandler = async (e) => {
        e.preventDefault()
        let [name, mail, password] = e.target.elements;
        let res = await fetch('/users/signup', {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                "name" : name.value,
                "password" : password.value,
                "email" : mail.value
            })
        });
        res = await res.json();
        !res.message ?
            this.props.login(name.value, res.role)
            : alert(res.message);
        this.props.close();
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.submitFormHandler}>
                    <FormGroup>
                        <Form.Label>Ник</Form.Label>
                        <Form.Control type='text'/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Почта</Form.Label>
                        <Form.Control type='email'/>
                    </FormGroup>
                    <FormGroup>
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type='password'/>
                    </FormGroup>
                    <Button type='submit'>Зарегистрироваться</Button>
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