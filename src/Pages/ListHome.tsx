// import { useState, useRef } from "react";
import "../Styles/ListHome.scss";

function ListHome() {
  return (
    <div>
      <h1>IKIGARA</h1>
      <div className="header-line">
        <span className="line"></span>
        <p style={{ color: "red" }}>Needs</p>
        <span className="line"></span>
      </div>

      <div className="header-line">
        <span className="line"></span>
        <p style={{ color: "green" }}>Got It</p>
        <span className="line"></span>
      </div>
    </div>
  );
}

export default ListHome;
