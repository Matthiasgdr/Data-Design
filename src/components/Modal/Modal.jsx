import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../lib/canvasjs.react";
import * as d3 from "d3";

import csvBitcoin from "../../data/bitcoin.csv";
import csvLitecoin from "../../data/litecoin.csv";
import csvRipple from "../../data/ripple.csv";
import csvDogecoin from "../../data/dogecoin.csv";
import csvEthereum from "../../data/ethereum.csv";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Modal = ({ isOpen, onClose, crypto }) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getCsv = {
      Bitcoin: csvBitcoin,
      Ripple: csvRipple,
      Litecoin: csvLitecoin,
      Ethereum: csvEthereum,
      DogeCoin: csvDogecoin,
    };
    if (crypto) {
      d3.csv(getCsv[crypto.title]).then((d) => {
        const dataPoints = [];
        d.forEach((point) => {
          dataPoints.push({
            x: new Date(point[d.columns[0]]),
            y: parseInt(point[d.columns[1]]),
          });
        });
        setData(dataPoints);
      });
    }
  }, [crypto]);

  if (!isOpen) {
    return null;
  }

  const options = {
    title: {
      text: `${crypto.title} popularity`,
    },
    axisY: {
      title: "% of popularity",
    },
    data: [
      {
        type: "spline",
        dataPoints: data,
        showInLegend: true,
      },
    ],
  };

  return (
    <div className="modal-container">
      <div className="back" onClick={onClose}></div>
      <div className="modal">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
