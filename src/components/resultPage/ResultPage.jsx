import React from "react";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import resultPage from "./resultPage.css";
import Login from "../login/Login";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

import { Navbar } from "../navbar/Navbar";
import { ClipLoader } from "react-spinners";

export function ResultPage() {
  const {
    questions,
    setQuestions,
    question_id,
    setQuestion_id,
    isUserActive,
    setIsUserActive,
    resultContent,
    setResultContent,
    newUserToQuiz,
    setNewUserToQuiz,
  } = useContext(Context);
  const [resultValue, setResultValue] = useState();
  const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://127.0.0.1:8000/mcq/get_resultData/`,
  //         {
  //           resultData: question_id,
  //         },
  //         {
  //           headers: {
  //             Authorization: `Token ${localStorage.getItem("token")}`,
  //             // You can include other headers as needed
  //           },
  //         }
  //       );
  //       console.log(response?.data?.result);

  //       setResultValue(response?.data?.result);
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //     console.log("isUserActive", isUserActive);
  //   };
  //   if (question_id) {
  //     fetchData(); // Call the async function immediately
  //   } else {
  //     navigate("/");
  //   }
  // }, [question_id]);
  const [percentage, setPercentage] = useState(0);
  const [showText, setShowText] = useState(true);
  function backButtonNavigate() {
    navigate("/");
  }

  useEffect(() => {
    // Set a timeout to hide the text after 10 seconds
    const timeoutId = setTimeout(() => {
      setShowText(false);
    }, 10000); // 10000 milliseconds = 10 seconds

    // Cleanup the timeout on component unmount or if the state changes before 10 seconds
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures useEffect runs only once

  useEffect(() => {
    const handlePopstate = (event) => {
      // Check if you are at a specific route or condition
      // In this example, it checks if the current path is "/questionPage"
      if (window.location.pathname === "/resultPage") {
        // Replace "/resultPage" with the route you want to navigate to
        navigate("/home");
      }
      // Add additional conditions if needed
    };

    // Add the event listener for popstate
    window.addEventListener("popstate", handlePopstate);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [navigate]); // Make sure to include navigate in the dependency array

  useEffect(() => {
    // Example: Update the percentage dynamically (e.g., based on user input)
    // Simulate dynamic updates with a setTimeout
    const updatePercentage = () => {
      const newPercentage = parseInt(
        (resultContent.correctCount /
          (resultContent.correctCount +
            resultContent.wrongCount +
            resultContent.skippedCount)) *
          100
      ); // Replace this with your actual logic
      setPercentage(newPercentage);
    };

    // Set initial percentage and start the update interval
    updatePercentage();
    const intervalId = setInterval(updatePercentage, 3000); // Update every 3 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const dashArrayValue = (percentage / 100) * 126;

  const greetingMessage = () => {
    if (percentage >= 70) {
      return "Great job! You've mastered the quiz!";
    } else if (percentage >= 50) {
      return "Good effort! Keep learning and improving.";
    } else {
      return "You can do better! Take some time to review and try again.";
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        resultContent ? (
          <>
            <Navbar />
            <section class="resultPage">
              <div class="result__title">
                {greetingMessage()}{" "}
                {!newUserToQuiz && showText && (
                  <div style={{ color: "red" }}>
                    You are already completed this quiz.
                  </div>
                )}
              </div>

              <div class="resultPage__body">
                <div class="resultPage__body_list">
                  <p>Test Summary:</p>
                  <ul>
                    <li>
                      Total Number of Questions :
                      <span>
                        {resultContent
                          ? resultContent.correctCount +
                            resultContent.wrongCount +
                            resultContent.skippedCount
                          : ""}
                      </span>
                    </li>
                    <li>
                      Number of Correct Answer :
                      <span>
                        {resultContent ? resultContent.correctCount : ""}
                      </span>
                    </li>
                    <li>
                      Number of Wrong Answer :
                      <span>
                        {resultContent ? resultContent.wrongCount : ""}
                      </span>
                    </li>
                    <li>
                      Number of Skipped Answer :
                      <span>
                        {resultContent ? resultContent.skippedCount : ""}
                      </span>
                    </li>
                  </ul>
                </div>

                <div class="resultPage__body_image">
                  <div className="chart-container">
                    <div className="chart">
                      <svg
                        className="svg"
                        width="100%"
                        height="100%"
                        viewBox="0 0 42 42"
                      >
                        <circle className="circle-bg" cx="21" cy="21" r="20" />
                        <circle
                          className="circle"
                          cx="21"
                          cy="21"
                          r="20"
                          style={{ strokeDasharray: `${dashArrayValue} 100` }}
                        />
                        <text
                          x="50%"
                          y="50%"
                          textAnchor="middle"
                          dy=".3em"
                          className="percentage-text"
                        >
                          {percentage}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div class="back_button" onClick={backButtonNavigate}>
                <IoArrowBack />
              </div>
            </section>
          </>
        ) : (
          <ClipLoader color="#36D7B7" />
        )
      ) : (
        <Login />
      )}
    </>
  );
}
