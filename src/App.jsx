import "./App.css";
import Board from "./components/Board";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <h1>Mineseweeper</h1>
      <div id="board-container">
        <Board />
      </div>
    </div>
  );
}

export default App;
