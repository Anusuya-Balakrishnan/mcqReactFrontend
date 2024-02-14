import React from "react";
import { SyncLoader, PropagateLoader, BarLoader } from "react-spinners";
import spinnerStyle from "./spinnerStyle.css";

function Spinner() {
  return (
    <div className="spinner-container">
      {/* <SyncLoader color="#072c50" /> */}
      <BarLoader color="#072c50" />
      {/* <PropagateLoader color="#072c50" /> */}
    </div>
  );
}

export default Spinner;
