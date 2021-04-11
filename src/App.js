import React, { useState } from "react";

import "./App.css";
import CryptoSquare from "./components/CryptoSquare";
import Modal from "./components/Modal";
import cryptos from "./data/crypto.json";

function App() {
  const cryptoKeys = Object.keys(cryptos);
  const [selectedCrypto, selectCrypto] = useState(null);

  const closeModal = () => {
    selectCrypto(null);
  };

  return (
    <div className="app">
      <div className="container">
        {cryptoKeys.map((crypto) => (
          <CryptoSquare
            key={cryptos[crypto].sign}
            crypto={cryptos[crypto]}
            selectCrypto={selectCrypto}
          />
        ))}
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
