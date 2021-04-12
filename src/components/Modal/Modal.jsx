import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../lib/canvasjs.react";
import * as d3 from "d3";

import valueBitcoin from "../../data/value/btc.csv";
import valueDogeCoin from "../../data/value/doge.csv";
import valueEthereum from "../../data/value/eth.csv";
import valueLitecoin from "../../data/value/ltc.csv";
import valueRipple from "../../data/value/xrp.csv";
import valueDash from "../../data/value/dash.csv";
import valueBinance from "../../data/value/bnb.csv";

import csvBitcoin from "../../data/bitcoin.csv";
import csvLitecoin from "../../data/litecoin.csv";
import csvRipple from "../../data/ripple.csv";
import csvDogecoin from "../../data/dogecoin.csv";
import csvEthereum from "../../data/ethereum.csv";
import csvDash from "../../data/dash_.csv";
import csvBinance from "../../data/binance.csv";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Modal = ({ isOpen, onClose, crypto }) => {
  const [data, setData] = useState();
  const [dataValues, setDataValues] = useState();

  useEffect(() => {
    const getCsvValues = {
      Bitcoin: valueBitcoin,
      Ripple: valueRipple,
      Litecoin: valueLitecoin,
      Ethereum: valueEthereum,
      DogeCoin: valueDogeCoin,
      Dash: valueDash,
      Binance: valueBinance,
    };
    const getCsv = {
      Bitcoin: csvBitcoin,
      Ripple: csvRipple,
      Litecoin: csvLitecoin,
      Ethereum: csvEthereum,
      DogeCoin: csvDogecoin,
      Dash: csvDash,
      Binance: csvBinance,
    };
    if (crypto) {
      d3.csv(getCsvValues[crypto.title]).then((values) => {
        d3.csv(getCsv[crypto.title]).then((d) => {
          const dataPoints = [];
          const dataValuesPoints = [];
          d.forEach((point) => {
            let value =
              values && values.find((val) => val.date === point[d.columns[0]]);
            dataPoints.push({
              x: new Date(point[d.columns[0]]),
              y: parseInt(point[d.columns[1]]),
            });
            if (value) {
              dataValuesPoints.push({
                x: new Date(value.date),
                y: Math.round(value.PriceUSD * 1000) / 1000,
              });
            }
          });
          setData(dataPoints);
          setDataValues(dataValuesPoints);
        });
      });
    }
  }, [crypto]);

  if (!isOpen) {
    return null;
  }

  const options = {
    title: {
      text: `${crypto.title} popularity and value along time`,
      fontFamily: "circular",
    },
    axisY: {
      title: "% of popularity",
    },
    axisY2: {
      title: "Value in US Dollars",
    },
    data: [
      {
        type: "spline",
        name: "% of popularity",
        showInLegend: true,
        dataPoints: data,
      },
      {
        type: "spline",
        name: "Value in US Dollars",
        showInLegend: true,
        axisYIndex: 1,
        axisYType: "secondary",
        dataPoints: dataValues,
      },
    ],
  };

  return (
    <div className="modal-container">
      <div className="back" onClick={onClose}></div>
      <div
        className="modal"
        style={{ border: `${crypto.colors.border} 6px solid` }}
      >
        <h2>{`${crypto.title} (${crypto.sign})`}</h2>
        <div className="container">
          <div className="info">{crypto.large_desc}</div>
          <div className="chart">
            <div>
              <CanvasJSChart options={options} />
            </div>
            <div
              style={{
                margin: "10px auto",
                maxWidth: "50%",
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              <p>
                Popularity is the percentage of searches for a word ("Bitcoin",
                "Ethereum") on Google Trends.
              </p>
              <p>
                Value in dollars is the value that the crypto has during a
                period of time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
