import React, { useState } from "react";

const CryptoSquare = ({ crypto }) => {
  const [PosX, setPosX] = useState(
    Math.floor(Math.random() * (window.innerWidth - 310))
  );
  const [PosY, setPosY] = useState(
    Math.floor(Math.random() * (window.innerHeight - 310))
  );

  const [cursorStart, setCursorStart] = useState();

  const [isDragging, setIsDragging] = useState(false);
  //   const [vector, setVector] = useState({ first: 0, second: 0 });

  const onMouseDown = (e) => {
    setIsDragging(true);
    setCursorStart({ x: e.pageX, y: e.pageY });
    // setVector((vector) => {
    //   return {
    //     first: { x: e.pageX, y: e.pageY },
    //     second: { x: e.pageX, y: e.pageY },
    //   };
    // });
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      setCursorStart({ x: e.pageX, y: e.pageY });
      setPosX((prevPosX) => prevPosX + (e.pageX - cursorStart.x));
      setPosY((prevPosY) => prevPosY + (e.pageY - cursorStart.y));
      //   setVector((vector) => {
      //     return {
      //       first: { x: vector.first.x, y: vector.first.y },
      //       second: { x: e.pageX, y: e.pageY },
      //     };
      //   });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    // startThrow();
  };

  //   const startThrow = () => {
  //     const moveX = (vector.first.x - vector.second.x) / 2;
  //     const moveY = (vector.first.y - vector.second.y) / 2;
  // 	requestAnimationFrame(loop)
  //   };

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="square"
      style={{
        backgroundColor: crypto.colors.background,
        border: `5px solid ${crypto.colors.border}`,
        left: PosX,
        top: PosY,
        cursor: !isDragging ? "grab" : "grabbing",
        zIndex: isDragging ? 10 : 0,
      }}
    >
      <div className="title" style={{ color: crypto.colors.border }}>
        {crypto.title}
      </div>
      <div className="crypto" style={{ color: crypto.colors.border }}>
        ({crypto.sign})
      </div>
      <div className="description">{crypto.description} </div>
    </div>
  );
};

CryptoSquare.propTypes = {};

export default CryptoSquare;
