import React from 'react';
import {connect} from 'react-redux'
import './App.css';
import SignUp from './components/Auth/Register'
import Login from './components/Auth/Login'
import {userLogout} from "./reducers/action";

const mapStateToProps = state => ({
    isAuth : state.isAuth,
    userName : state.username
})

function App(props) {
//Проверка подключения к экспрессу
  const checkConnect = async () => {
      let check = await fetch('/test')
      alert(await check.text());
  }

  return (
    <div className="App">
      <button onClick={checkConnect}>Check if express connected</button>
        {!props.isAuth && <SignUp/>}
        <br/>
        {!props.isAuth && <Login/>}
        {props.isAuth &&
        <div>
            <button onClick={props.logout}>Выйти</button>
        </div>
        }
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
