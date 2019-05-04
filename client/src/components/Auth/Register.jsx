import React from 'react'
import {connect} from 'react-redux'
import {userLogin} from '../../reducers/actions/actions'

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
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitFormHandler}>
                    <label>Ник</label>
                    <input type='text'/>
                    <br/>
                    <label>Почта</label>
                    <input type='email'/>
                    <br/>
                    <label>Пароль</label>
                    <input type='password'/>
                    <br/>
                    <button type='submit'>Зарегистрироваться</button>
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

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)