import React from 'react';
import {connect} from 'react-redux'
import {userLogin} from '../../reducers/actions/actions'

class Login extends React.Component {

    submitFormHandler = async (e) => {
        e.preventDefault()
            let [mail, password] = e.target.elements;
            let res = await fetch('/users/login', {
                method: 'POST',
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
    }

    render () {
        return (
            <div>
                <form onSubmit={this.submitFormHandler}>
                    <label>Почта</label>
                    <input type='email'/>
                    <br/>
                    <label>Пароль</label>
                    <input type='password'/>
                    <br/>
                    <button type='submit'>Войти</button>
                </form>
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