import React from "react";
import flag from "../img/flag.png";
import cancelMine from "./../img/cancel-mine.png";
import mine from "./../img/mine.png";
const Cell = ({ details, updateFlag, revealCell, gameActive }) => {
  const numberColor = () => {
    let color;

    if (details.value === 0) color = "";
    if (details.value === 1) color = "blue";
    if (details.value === 2) color = "green";
    if (details.value === 3) color = "red";
    if (details.value === 4) color = "dark-blue";
    if (details.value === 5) color = "brown";
    if (details.value === 6) color = "light-blue";
    if (details.value === 7) color = "black";
    if (details.value === 8) color = "light-grey";

    return `board-cell ${color}`;
  };

  const cellClass = numberColor();
  return (
    <div
      onClick={() => revealCell(details.x, details.y)}
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      className={`${cellClass}`}
    >
      {details.revealed ? details.value : ""}
      {details.flagged && !(details.value === -1) && (
        <img
          className={gameActive ? "flag" : "cancel-mine"}
          src={gameActive ? flag : cancelMine}
        />
      )}
      {details.value === -1 && (
        <img
          className={!gameActive && details.flagged ? "mine red-bg" : "mine"}
          src={mine}
        />
      )}
    </div>
  );
};

export default Cell;
