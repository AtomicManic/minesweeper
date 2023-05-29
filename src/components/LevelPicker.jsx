import React from "react";

const LevelPicker = ({ changeLevel, level, isPicked }) => {
  let name;
  let className;
  if (level === 1) name = "Easy";
  if (level === 2) name = "Medium";
  if (level === 3) name = "Hard";
  className = isPicked ? "btn btn-primary" : "btn btn-outline-primary";

  return (
    <div className="level">
      <button
        onClick={(e) => changeLevel(e)}
        type="button"
        className={className}
        value={level}
      >
        {name}
      </button>
    </div>
  );
};

export default LevelPicker;
