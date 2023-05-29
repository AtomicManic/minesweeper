import React, { useEffect, useState } from "react";
import createBoard from "../util/createBoard";
import Cell from "./Cell";
import { reveal } from "../util/reveal";
import LevelPicker from "./LevelPicker";
import levels from "../data/levels.json";
import { getNonMinesCount } from "../util/reveal";
import Timer from "./Timer";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [level, setLevel] = useState(1);
  const [cellsLeft, setCellsLeft] = useState(0);
  const [flags, setFlegs] = useState(0);
  const [didWin, setDidWin] = useState(false);

  useEffect(() => {
    getNewBoard();
  }, [level]);

  const handleNewGame = () => {
    setDidWin(false);
    getNewBoard();
  };

  const getNewBoard = () => {
    const { rows, columns, mines } = determineLevel();
    const newBoard = createBoard(rows, columns, mines);
    setGrid(newBoard.board);
    setMineLocations(newBoard.mineLocation);
    setGameActive(true);
    setCellsLeft(rows * columns - mines);
    setDidWin(false);
  };

  const determineLevel = () => {
    let levelDetails;
    if (level === 1) {
      levelDetails = levels.find((l) => level === l.id);
    }
    if (level === 2) {
      levelDetails = levels.find((l) => level === l.id);
    }
    if (level === 3) {
      levelDetails = levels.find((l) => level === l.id);
    }
    return levelDetails;
  };

  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let flagNum;
    if (!gameActive || grid[x][y].revealed) return;
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged) {
      newGrid[x][y].flagged = false;
      flagNum = flags - 1;
    } else {
      newGrid[x][y].flagged = true;
      flagNum = flags + 1;
    }
    setFlegs(flagNum);
    const { rows, columns, mines } = determineLevel();
    setGrid(newGrid);
    handleDidWin(newGrid, rows, columns, mines);
  };

  const revealCell = (x, y) => {
    // check if click is legal
    if (!gameActive || didWin) return;
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].flagged === true) return;

    // check if clicked a mine
    if (newGrid[x][y].value === "X") {
      setGameActive(false);
      gameOver(newGrid);
    } else {
      // get level information
      const { rows, columns, mines } = determineLevel();

      // reveal the borad
      let newRevealedBoard = reveal(newGrid, x, y);
      setGrid(newRevealedBoard);
      handleDidWin(newRevealedBoard, rows, columns, mines);
    }
  };

  const gameOver = (newGrid) => {
    for (let i = 0; i < mineLocations.length; i++) {
      newGrid[mineLocations[i][0]][mineLocations[i][1]].value = -1;
    }
    setGrid(newGrid);
  };

  const changeLevel = (e) => {
    e.preventDefault();
    setLevel(parseInt(e.target.value));
    setDidWin(false);
  };

  const handleSmileyDown = (e) => {
    e.preventDefault();
    document.getElementById("smiley").className =
      "bi bi-emoji-expressionless-fill";
  };

  const handleSmileyUp = (e) => {
    e.preventDefault();
    document.getElementById("smiley").className = "bi bi-emoji-smile-fill";
  };

  const handleDidWin = (newRevealedBoard, rows, columns, mines) => {
    const { cellsRemain, win } = getNonMinesCount(
      newRevealedBoard,
      rows,
      columns,
      mines
    );
    setCellsLeft(cellsRemain);

    // check if all mines are flagged
    let flag = true;
    for (let m of mineLocations) {
      if (!newRevealedBoard[m[0]][m[1]].flagged) {
        flag = false;
      }
    }
    // if cellCount === 0 and all mines are flagged
    if (win && flag) {
      // set winning
      setDidWin(true);
    } else {
      // set continue
      setDidWin(false);
    }
  };

  return (
    <>
      <div id="levels">
        {levels.map((l) => {
          return (
            <LevelPicker
              key={l.id}
              level={l.id}
              changeLevel={changeLevel}
              isPicked={level === l.id ? true : false}
            />
          );
        })}
      </div>
      <div id="timer-counter-container">
        <div id="counter">{cellsLeft}</div>
        <button
          onClick={() => handleNewGame()}
          onMouseDown={handleSmileyDown}
          onMouseUp={handleSmileyUp}
          className={
            (!gameActive && "btn btn-danger new-game-btn") ||
            (didWin && "btn btn-success new-game-btn") ||
            "btn btn-outline-secondary new-game-btn"
          }
        >
          <i
            id="smiley"
            className={
              (!gameActive && "bi bi-emoji-dizzy-fill") ||
              (didWin && "bi bi-emoji-sunglasses-fill") ||
              "bi bi-emoji-smile-fill"
            }
          ></i>
        </button>
        <div id="timer">100</div>
      </div>
      <div className={didWin ? "green-border" : ""}>
        {grid.map((singleRow) => {
          return (
            <div className="board-row">
              {singleRow.map((singleBlock) => {
                return (
                  <Cell
                    details={singleBlock}
                    updateFlag={updateFlag}
                    revealCell={revealCell}
                    gameActive={gameActive}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Board;
