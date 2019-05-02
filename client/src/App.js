import React from 'react';
import './App.css';
import SignUp from './components/Register'
import Login from './components/Login'

function App() {
//Проверка подключения к экспрессу
  const checkConnect = async () => {
      let check = await fetch('/test')
      alert(await check.text());
  }

  return (
    <div className="App">
      <button onClick={checkConnect}>Check if express connected</button>
        <SignUp/>
        <br/>
        <Login/>
    </div>
  );
}

export default App;
