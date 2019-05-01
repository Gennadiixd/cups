import React from 'react';
import './App.css';
import YandexMaps from './containers/YandexMaps'

function App() {
//Проверка подключения к экспрессу
  const checkConnect = async () => {
      let check = await fetch('/test')
      alert(await check.text());
  }

  return (
    <div className="App">
      <button onClick={checkConnect}>Check if express connected</button>
      <YandexMaps />
    </div>
  );
}

export default App;
