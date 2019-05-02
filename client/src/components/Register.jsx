import React from 'react'

export default class SignUp extends React.Component {
    state = {
        pass : '',
        email : '',
        name : ''
    }

    submitFormHandler = async (e) => {
        e.preventDefault()
        let [name, mail, password] = e.target.elements
        let res = await fetch('/user/signup', {
            method : 'POST',
            headers: {'Content-Type':'application/json'},
            body : JSON.stringify({
                "name" : name.value,
                "password" : password.value,
                "email" : mail.value
            })
        })
        res = await res.text()
        res === 'success' ? alert('Registered') : alert('Error')
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