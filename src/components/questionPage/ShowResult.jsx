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
function ShowResult() {
  const { finalResult, setFinalResult } = useContext(Context);
  const [questionNo, setQuestionNo] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (finalResult.length > 0) {
      setQuestionNo(0);
      setTotalQuestions(finalResult.length);
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
              <p>mark</p>
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
                    <div className="optionBlock">
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
                        <p className="option">{item}</p>
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
                <div
                  onClick={movePreivousQuestion}
                  style={{ display: questionNo == 0 && "none" }}
                >
                  <Button name="previous" iconName="previous" />
                </div>
                <div
                  onClick={changeQuestionNo}
                  style={{
                    display: questionNo == finalResult.length - 1 && "none",
                  }}
                >
                  <Button name="next" iconName="next" />
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
          </div>
        </>
      ) : (
        <Home />
      )}
    </>
  );
}

export default ShowResult;
