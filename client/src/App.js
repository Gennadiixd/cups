import React, {useEffect} from 'react';

import YandexMaps from './containers/YandexMaps/YandexMaps'
import Header from './components/Header/Header'

import {connect} from 'react-redux'
import {userLogin, userLogout} from "./reducers/actions/actions";


const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

function App(props) {

    useEffect(() => {
        async function checkUser() {
            try {
                let res = await fetch('/users/check')
                res = await res.json()
                props.login(res.name, res.role)
            } catch (err) {console.log('Connection to server Failed')}
        }
        checkUser()
    }, [])

  return (
    <div className="App">
      <Header />
      <YandexMaps />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userLogout()),
        login: (n,r) => dispatch(userLogin(n,r))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
