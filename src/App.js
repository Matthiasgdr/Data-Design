import React, { useState, useEffect } from "react";

import "./App.css";
import CryptoSquare from "./components/CryptoSquare";
import Modal from "./components/Modal";
import SortArrow from "./components/SortArrow";
import cryptos from "./data/crypto.json";

function App() {
  const cryptoKeys = Object.keys(cryptos).reverse();

  const [wellSorted, setWellSorted] = useState(false);

  const [selectedCrypto, selectCrypto] = useState(null);
  const [squaresPos, setSquarePos] = useState({});

  useEffect(() => {
    if (
      squaresPos.Ripple > squaresPos.Ethereum &&
      squaresPos.Ethereum > squaresPos.Litecoin &&
      squaresPos.Litecoin > squaresPos.Bitcoin &&
      squaresPos.Bitcoin > squaresPos.DogeCoin
    ) {
      setWellSorted(true);
    } else {
      setWellSorted(false);
    }
  }, [squaresPos]);

  const closeModal = () => {
    selectCrypto(null);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app-title">
          Try to sort the crypto by their today popularity !
        </div>
        <div className={`well-sorted ${wellSorted ? "good" : "bad"}`}>
          {wellSorted
            ? "It's well sorted, good job !"
            : "Not well sorted their"}
        </div>
        {cryptoKeys.map((crypto) => (
          <CryptoSquare
            key={cryptos[crypto].sign}
            crypto={cryptos[crypto]}
            selectCrypto={selectCrypto}
            setSquarePos={setSquarePos}
          />
        ))}
        <SortArrow></SortArrow>
      </div>
      <Modal
        isOpen={!!selectedCrypto}
        crypto={selectedCrypto}
        onClose={closeModal}
      ></Modal>
    </div>
  );
}

export default App;
