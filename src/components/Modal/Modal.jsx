import React, { useState, useEffect } from "react";
import CanvasJSReact from "../../lib/canvasjs.react";
import * as d3 from "d3";

import valueBitcoin from "../../data/value/btc.csv";

import csvBitcoin from "../../data/bitcoin.csv";
import csvLitecoin from "../../data/litecoin.csv";
import csvRipple from "../../data/ripple.csv";
import csvDogecoin from "../../data/dogecoin.csv";
import csvEthereum from "../../data/ethereum.csv";

// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Modal = ({ isOpen, onClose, crypto }) => {
  const [values, setValues] = useState();

  const [data, setData] = useState();
  const [dataValues, setDataValues] = useState();
  console.log(
    "LOG ~ file: Modal.jsx ~ line 21 ~ Modal ~ dataValues",
    dataValues
  );

  useEffect(() => {
    d3.csv(valueBitcoin).then((d) => {
      setValues(d);
    });
  }, [crypto]);

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
        const dataValuesPoints = [];
        d.forEach((point) => {
          let value = values.find((val) => val.date === point[d.columns[0]]);
          dataPoints.push({
            x: new Date(point[d.columns[0]]),
            y: parseInt(point[d.columns[1]]),
          });
          dataValuesPoints.push({
            x: new Date(value.date),
            y: Math.round(value.PriceUSD),
          });
        });
        setData(dataPoints);
        setDataValues(dataValuesPoints);
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
    axisY2: {
      title: "Value in US Dollars",
    },
    data: [
      {
        type: "spline",
        name: "Popularity",
        showInLegend: true,
        dataPoints: data,
      },
      {
        type: "spline",
        name: "Value",
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
      <div className="modal">
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
};

Modal.propTypes = {};

export default Modal;
