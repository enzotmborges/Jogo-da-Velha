import React, { useState, useEffect } from "react";
import './App.css';

const quadroInicial = Array(9).fill('');

const App = () => {
  const [quadro, setQuadro] = useState(quadroInicial);
  const [jogadorAtual, setJogadorAtual] = useState('X');
  const [vencedor, setVencedor] = useState('');
  const [empate, setEmpate] = useState(false);

  const handleClick = (index) => {
    if (quadro[index] !== '' || vencedor || empate) {
      return;
    }

    const novoQuadro = [...quadro];
    novoQuadro[index] = jogadorAtual;
    setQuadro(novoQuadro);
    const proximoJogador = jogadorAtual === 'X' ? 'O' : 'X';
    setJogadorAtual(proximoJogador);
  };

  const calcularVencedor = (quadradin) => {
    const condicoesParaVencer = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ]; // diagonais

    for (let condicao of condicoesParaVencer) {
      const [a, b, c] = condicao;
      if (
        quadradin[a] &&
        quadradin[a] === quadradin[b] &&
        quadradin[a] === quadradin[c]
      ) {
        return quadradin[a];
      }
    }

    return null;
  };

  useEffect(() => {
    const verificarVencedor = calcularVencedor(quadro);

    if (verificarVencedor) {
      setVencedor(verificarVencedor);
    } else if (quadro.every(celula => celula !== '')) {
      setEmpate(true);
    } else {
      setEmpate(false);
    }
  }, [quadro]);

  const reiniciar = () => {
    setQuadro(quadroInicial);
    setJogadorAtual('X');
    setVencedor('');
    setEmpate(false);
  };

  return (
    <div className="app">
      <div className="board">
        {quadro.map((celula, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="cell"
          >
            {celula}
          </div>
        ))}
      </div>

      {vencedor && (
        <div className="winner-message">
          <p>O jogador {vencedor} venceu!</p>
          <button onClick={reiniciar}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default App;
