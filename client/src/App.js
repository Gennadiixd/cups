import React from 'react';

import YandexMaps from './containers/YandexMaps/YandexMaps'
import Header from './components/Header/Header'

import {connect} from 'react-redux'
import {userLogout} from "./reducers/actions/actions";


const mapStateToProps = state => ({
    isAuth : state.auth.isAuth,
    userName : state.auth.username
})

function App(props) {
  return (
    <div className="App">
      <Header />
      <YandexMaps />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
