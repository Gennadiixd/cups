import React, {useEffect, useState} from 'react';

import Header from './components/Header/Header'
import Main from './components/Main'

import {connect} from 'react-redux'
import {userLogin, userLogout} from "./reducers/actions/actions";


const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

function App(props) {
    //React Hook для использования состояния в функциональном компоненте
    const [session, setSession] = useState({checked : false})
    //React Hook для использования ComponentWillMount в функциональном компоненте
    useEffect(() => {
        //Проверяем на наличие сессии на сервере
        async function checkUser() {
            try {
                let res = await fetch('/users/check')
                res = await res.json()
                setSession({checked : true})
                if (res!==false)
                props.login(res.user, res.tasks)
                
            } catch (err) {console.log('Connection to server Failed')}
        }
        //Если сессия была проверена, больше этого не делать
        if (!session.checked && !props.isAuth)
            checkUser()
    }, [props, session])

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userLogout()),
        login: (user, tasks) => dispatch(userLogin(user, tasks))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
