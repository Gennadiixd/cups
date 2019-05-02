import React from 'react';

export default class Login extends React.Component {

    submitFormHandler = async (e) => {
        e.preventDefault()
        let [mail, password] = e.target.elements;
        let res = await fetch('/user/login', {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                "password" : password.value,
                "email" : mail.value
            })
        });
        res = await res.text();
        alert(res);
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