import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../../reducers/actions/actions';
import { Form, Button } from 'react-bootstrap';
import { placeMarksOnMapAC } from "../../reducers/actions/actions";

class Login extends React.Component {
    state = {
        validated : false,
        message : ''
    }

    //Проверка правильности заполнения формы
    submitFormHandler = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            //Если неправильно - показать пользователю
            this.setState({validated: true})
        } else
            //Если все "ок" отправить на сервер
            this.submitLogin(e)
    }

    //Отправка формы на сервер
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
        //Если нет сообщения об ошибке то занести данные в redux
        if (!res.message) {
            this.props.login(res.user, res.tasks); //Добавление данных о пользователе в redux
            this.props.close(); //Закрыть модальное окно
            this.props.placeMarksOnMap(); //Рендер точек на карте для пользователя
            window.location = '#/'
        }
        else this.setState({message : res.message}) //Сообщение об ошибке
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
        login: (user, tasks) => dispatch(userLogin(user, tasks)),
        placeMarksOnMap: () => dispatch(placeMarksOnMapAC()),
    }
}

export default connect(null, mapDispatchToProps)(Login)