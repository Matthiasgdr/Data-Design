import React, { useState, useEffect } from "react";

const CryptoSquare = ({ crypto, selectCrypto, setSquarePos }) => {
  const [initialPos, setInitialPos] = useState();
  const [PosX, setPosX] = useState(
    Math.floor(Math.random() * (window.innerWidth - 310))
  );
  const [PosY, setPosY] = useState(
    Math.floor(Math.random() * (window.innerHeight - 310))
  );

  const [cursorStart, setCursorStart] = useState();
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e) => {
    setIsDragging(true);
    setInitialPos({ PosX, PosY });
    setCursorStart({ x: e.pageX, y: e.pageY });
  };

  const onMouseMove = (e) => {
    if (isDragging && cursorStart) {
      setCursorStart({ x: e.pageX, y: e.pageY });
      setPosX((prevPosX) => prevPosX + (e.pageX - cursorStart.x));
      setPosY((prevPosY) => prevPosY + (e.pageY - cursorStart.y));
    }
  };

  const onMouseUp = (e) => {
    setIsDragging(false);
  };

  const onClick = () => {
    if (initialPos.PosX === PosX && initialPos.PosY === PosY) {
      selectCrypto(crypto);
    }
  };

  useEffect(() => {
    setSquarePos((old) => {
      return {
        ...old,
        [crypto.title]: PosX,
      };
    });
  }, [PosX]);

  return (
    <div
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      className="square"
      style={{
        backgroundColor: crypto.colors.background,
        border: `5px solid ${crypto.colors.border}`,
        // transform: `translate(${PosX}px, ${PosY}px)`,
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
