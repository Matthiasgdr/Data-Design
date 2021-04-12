import React from "react";
import PropTypes from "prop-types";

const SortArrow = (props) => {
  return (
    <div className="arrow-container">
      <div className="legend-right">Less popular</div>
      <div className="legend-left">More popular</div>
      <div className="arrow-wrapper">
        <div className="arrow-right"></div>
        <div className="arrow-left"></div>
        <div className="arrow-body"></div>
      </div>
    </div>
  );
};

SortArrow.propTypes = {};

export default SortArrow;
