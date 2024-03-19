import React, { useState } from "react";
import "./dashboardStyle.css";
import { Navbar } from "../navbar/Navbar";
import { MdCheckCircleOutline } from "react-icons/md";
import { WiTime3 } from "react-icons/wi";
import { BsPercent } from "react-icons/bs";

import Button from "../questionPage/Button";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css"; // Import default styles for rc-slider

function DashBoard() {
  const str =
    localStorage.getItem("username")[0].toUpperCase() +
    localStorage.getItem("username").slice(1);
  const [userName, setUserName] = useState(str);
  const [value, setValue] = useState(30); // Initial value

  return (
    <div>
      <Navbar />
      <div className="dashboard_container">
        <div className="dashboard_title">
          <div className="title_child1">
            Welcome <span>{userName}</span>
          </div>
          <div className="title_child2">
            <div className="subChild">
              <div className="icon completed">
                <MdCheckCircleOutline />
                <span> 300</span>
              </div>
              <div className="text_message">Completed Quiz</div>
            </div>
            <div className="subChild">
              <div className="icon pending">
                <WiTime3 />
                <span> 200</span>
              </div>
              <div className="text_message">Pending Quiz</div>
            </div>
            <div className="subChild">
              <div className="icon percentage">
                <span> 30</span>
                <BsPercent />
              </div>
              <div className="text_message">% of Completion</div>
            </div>
          </div>
        </div>
        <div className="dashboard_body">
          <div className="body_title">Language</div>
          <div className="body_content">
            <div className="body_each_language">
              <div className="language_title">Java</div>
              <div className="language_body">
                <div className="language_range">
                  <div className="range_child" style={{ width: `90%` }}></div>
                </div>
                <div className="language_percentage">30%</div>
                <Button name="View Details" />
              </div>
            </div>
            <div className="body_each_language">
              <div className="language_title">Java</div>
              <div className="language_body">
                <div className="language_range">
                  <div className="range_child" style={{ width: `30%` }}></div>
                </div>
                <div className="language_percentage">30%</div>
                <Button name="View Details" />
              </div>
            </div>
            <div className="body_each_language">
              <div className="language_title">Java</div>
              <div className="language_body">
                <div className="language_range">
                  <div className="range_child" style={{ width: `50%` }}></div>
                </div>
                <div className="language_percentage">30%</div>
                <Button name="View Details" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
