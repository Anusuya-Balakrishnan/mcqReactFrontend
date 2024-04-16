import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import Spinner from "../Spinner/Spinner";
import "./completedTopicStyle.css";
import Button from "../questionPage/Button";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import { IoArrowBack } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CompletedTopic() {
  let { languageId, languageName } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const { finalResult, setFinalResult } = useContext(Context);
  const url = "https://mcqbackend.vercel.app/mcq/";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url + `resultTopicList/${languageId}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );
        setUserData(response?.data);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };
    fetchData(); // Call the async function immediately
  }, [languageId]);

  const getAnswer = async (resultId) => {
    try {
      setLoading(true);
      localStorage.setItem("language", languageName);
      const response = await axios.get(
        // "http://127.0.0.1:8000/mcq/showResult/",
        `${url}answerValueInTopicPage/${resultId}/`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        }
      );
      setFinalResult(response?.data);

      navigate("/result");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <>
          <Navbar />
          {loading ? (
            <Spinner />
          ) : (
            <section>
              <div className="completedTopic_container">
                <div className="container_child1">
                  <div className="child1_title">{languageName}</div>
                  <div className="child1_range">
                    <div className="range_scale">
                      <div
                        className="range_scale_child"
                        style={{
                          width: `${Math.floor(
                            (userData["completedTopicCount"] /
                              userData["Totaltopic"]) *
                              100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <div className="title_content">
                      <div>
                        {userData["completedTopicCount"]}/
                        {userData["Totaltopic"]} Answered
                      </div>
                      <div className="percent">
                        {Math.floor(
                          (userData["completedTopicCount"] /
                            userData["Totaltopic"]) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container_child2">
                  <div className="child2_title">Topic Completed</div>
                  <div className="child2_content">
                    {userData["topicIdList"].map((item, index) => {
                      return (
                        <div className="each_content" key={index}>
                          <p>{item["topicName"]}</p>

                          <div
                            onClick={() => {
                              getAnswer(item["resultId"]);
                            }}
                          >
                            <Button name="View Result" />
                          </div>
                        </div>
                      );
                    })}
                    <ToastContainer
                      position="top-center"
                      autoClose={5000}
                      hideProgressBar
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss={false}
                      draggable
                      pauseOnHover
                      theme="dark"
                      transition={Bounce} // Corrected syntax
                    />
                  </div>
                </div>
                <div
                  className="backButton"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  <IoArrowBack />
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default CompletedTopic;
