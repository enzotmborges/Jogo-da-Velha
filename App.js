// App.js
import React from 'react';
import './App.css'; // Certifique-se de ter o arquivo App.css no mesmo diretório

import Game from './App.jsx'; // Importe o componente Game (que contém o tabuleiro do jogo da velha)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jogo da Velha</h1>
        <Game /> {/* Renderize o componente Game */}
      </header>
    </div>
  );
}

export default App;
