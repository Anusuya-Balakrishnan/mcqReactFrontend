import React from "react";
import showResultStyle from "./showResultStyle.css";
import { useEffect, useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Context from "../Context";
import { Navbar } from "../navbar/Navbar";
import Button from "./Button";
import { Home } from "../home/Home";
import { GrLinkNext } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function ShowResult() {
  const { finalResult, setFinalResult } = useContext(Context);
  const [questionNo, setQuestionNo] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [mark, setMark] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (finalResult.length > 0) {
      setQuestionNo(0);
      setTotalQuestions(finalResult.length);
      // console.log(finalResult[0]["isCorrect"]);
      let temp = 0;
      for (let eachResult of finalResult) {
        if (eachResult["isCorrect"]) {
          temp += 1;
        }
      }
      setMark(temp);
    }
  }, [finalResult]);

  const changeQuestionNo = () => {
    if (questionNo < finalResult.length - 1) {
      setQuestionNo((preValue) => preValue + 1);
    }
  };
  const movePreivousQuestion = () => {
    if (questionNo > 0) {
      setQuestionNo((preValue) => preValue - 1);
    }
  };
  return (
    <>
      {finalResult.length > 0 ? (
        <>
          <Navbar />
          <div className="questionContainer">
            <div className="questionName">
              <p className="questionNameBlock">
                <span>{questionNo + 1}.</span>
                {finalResult[questionNo]["question"]}
              </p>
              <p className="mark_container">
                Total Points Scored:
                <span> {mark}</span>
              </p>
            </div>
            <div className="questionBody">
              <div className="code">
                {finalResult[questionNo]["code"] && (
                  <SyntaxHighlighter
                    language={localStorage.getItem("language").toLowerCase()}
                    style={darcula}
                  >
                    {finalResult[questionNo]["code"] || ""}
                  </SyntaxHighlighter>
                )}
              </div>
              <div className="options">
                {finalResult[questionNo]["option"].map((item, index) => {
                  return (
                    <div iv className="optionBlock" key={index}>
                      <div
                        className="optionContainer"
                        style={{
                          color:
                            (item === finalResult[questionNo]["answer"] ||
                              item ===
                                finalResult[questionNo]["selectedAnswer"]) &&
                            "white",
                          backgroundColor:
                            (item === finalResult[questionNo]["answer"] &&
                              "#17CA53") ||
                            (item ===
                              finalResult[questionNo]["selectedAnswer"] &&
                              "#FF6868"),
                        }}
                      >
                        <p className="option">
                          <span>
                            {index == 0
                              ? "A"
                              : index == 1
                              ? "B"
                              : index == 2
                              ? "C"
                              : "D"}
                          </span>{" "}
                          {item}
                        </p>
                      </div>
                      {!finalResult[questionNo]["isCorrect"]
                        ? (finalResult[questionNo]["selectedAnswer"] ===
                            item && (
                            <p className="wrongAnswer">Wrong Answer</p>
                          )) ||
                          (finalResult[questionNo]["answer"] === item && (
                            <p className="correctAnswer">Correct Answer</p>
                          ))
                        : finalResult[questionNo]["answer"] === item && (
                            <p className="correctAnswer">Correct Answer</p>
                          )}
                    </div>
                  );
                })}
              </div>
              <div className="questionChangeButton">
                <div onClick={movePreivousQuestion}>
                  <Button
                    name="previous"
                    iconName="previous"
                    color={`${questionNo == 0 ? "#2d81f78e" : "#2D81F7"}`}
                  />
                </div>
                <div onClick={changeQuestionNo}>
                  <Button
                    name="next"
                    iconName="next"
                    color={`${
                      questionNo == finalResult.length - 1
                        ? "#2d81f78e"
                        : "#2D81F7"
                    }`}
                  />
                </div>
              </div>
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
            <div
              className="backButton"
              onClick={() => {
                navigate("/home");
              }}
            >
              <IoArrowBack />
            </div>
          </div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
}

export default ShowResult;
