import React from "react";
import { SyncLoader } from "react-spinners";
import spinnerStyle from "./spinnerStyle.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <SyncLoader color="#072c50" />
    </div>
  );
}

export default Spinner;
