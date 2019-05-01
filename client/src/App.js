import React from 'react';
import './App.css';

function App() {
//Проверка подключения к экспрессу
  const checkConnect = async () => {
      let check = await fetch('/test')
      alert(await check.text());
  }

  return (
    <div className="App">
      <button onClick={checkConnect}>Check if express connected</button>
    </div>
  );
}

export default App;
