import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

function App() {
  //Проверка подключения к экспрессу
  const checkConnect = async () => {
    let check = await fetch('/test')
    alert(await check.text());
  }

  return (
    <div>
      <Header />
      <Main />
      <Footer />
      <button onClick={checkConnect}>Check if express connected</button>
    </div>
  );
}

export default App;