import React, { useEffect, useState } from "react";
import "./dashboardStyle.css";
import { Navbar } from "../navbar/Navbar";
import { MdCheckCircleOutline } from "react-icons/md";
import { WiTime3 } from "react-icons/wi";
import { BsPercent } from "react-icons/bs";
import axios from "axios";
import Button from "../questionPage/Button";
import Spinner from "../Spinner/Spinner";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css"; // Import default styles for rc-slider

function DashBoard() {
  const navigate = useNavigate();
  const str =
    localStorage.getItem("username")[0].toUpperCase() +
    localStorage.getItem("username").slice(1);
  const [userName, setUserName] = useState(str);
  const [userData, setUserData] = useState([]);
  const url = "https://mcqbackend.vercel.app/mcq/";
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "dashboard/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        });
        setUserData(response?.data);
        console.log(response?.data);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Navbar />
          {loading ? (
            <Spinner />
          ) : (
            <div>
              <div className="dashboard_container">
                <div className="dashboard_title">
                  <div className="title_child1">
                    Welcome <span>{userName}</span>
                  </div>
                  <div className="title_child2">
                    <div className="subChild">
                      <div className="icon completed">
                        <MdCheckCircleOutline />
                        <span>
                          {userData && userData["noOfTopicCompleted"]}
                        </span>
                      </div>
                      <div className="text_message">Completed Quiz</div>
                    </div>
                    <div className="subChild">
                      <div className="icon pending">
                        <WiTime3 />
                        <span> {userData && userData["noOfPendingTopic"]}</span>
                      </div>
                      <div className="text_message">Pending Quiz</div>
                    </div>
                    <div className="subChild">
                      <div className="icon percentage">
                        <span>
                          {userData && userData["completedPercentage"]}
                        </span>
                        <BsPercent />
                      </div>
                      <div className="text_message">% of Completion</div>
                    </div>
                  </div>
                </div>
                <div className="dashboard_body">
                  <div className="body_title">Language</div>
                  <div className="body_content">
                    {userData &&
                      userData["resultData"].map((item, index) => {
                        return (
                          <div className="body_each_language" key={index}>
                            <div className="language_title">
                              {item["languageName"]}
                            </div>
                            <div className="language_body">
                              <div className="language_range">
                                <div
                                  className="range_child"
                                  style={{
                                    width: `${item["completedPercentage"]}%`,
                                    backgroundColor: `${
                                      item["completedPercentage"] === 100 &&
                                      "#62FFA1"
                                    }`,
                                  }}
                                ></div>
                              </div>
                              <div className="language_percentage">
                                {item["completedPercentage"]}%
                              </div>
                              <div
                                onClick={() => {
                                  navigate(
                                    `/dashboardPageResult/${item["languageId"]}/${item["languageName"]}`
                                  );
                                }}
                              >
                                <Button name="View Details" />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default DashBoard;
