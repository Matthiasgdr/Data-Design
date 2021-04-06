import "./App.css";
import CryptoSquare from "./components/CryptoSquare";
import cryptos from "./data/crypto.json";

function App() {
  const cryptoKeys = Object.keys(cryptos);
  return (
    <div className="app">
      <div className="container">
        {cryptoKeys.map((crypto) => (
          <CryptoSquare key={cryptos[crypto].sign} crypto={cryptos[crypto]} />
        ))}
      </div>
    </div>
  );
}

export default App;
