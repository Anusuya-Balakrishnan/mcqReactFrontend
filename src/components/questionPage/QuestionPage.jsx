import React, { useEffect, useContext, useState } from "react";
// import MyContext, { useMyContext } from "../MyContext";
import Context from "../Context";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import Button from "./Button";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import questionPage from "./questionPage.css";
import { json, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiTimerLine } from "react-icons/ri";
import { ResultPage } from "../resultPage/ResultPage";
import { NavbarForQuiz } from "../navbar/NavbarForQuiz";
import Spinner from "../Spinner/Spinner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

export function QuestionPage() {
  // data from test instruction page
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
    answeredQuestions,
    setAnsweredQuestions,
  } = useContext(Context);
  const navigate = useNavigate();
  let { topicName } = useParams();
  const [actualQuestions, setActualQuestions] = useState({});
  const [id_list, setId_list] = useState([]);
  const [count, setCount] = useState(0);
  const [currentQuestion, setcurrentQuestion] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState();
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [resultList, setResultList] = useState({});
  const [topicIdData, settopicId] = useState(questions["topicId"]);
  const [languageIdData, setLanguageIdData] = useState(questions["languageId"]);
  const [level, setLevel] = useState(questions["level"]);
  const [resultObject, setResultObject] = useState({});
  const [isSelected, setSelected] = useState(0);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(false);
  const [iscompleted, SetCompleted] = useState(false);

  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {
    setActualQuestions(questions.key || {});

    setId_list(Object.keys(questions.key || {}));
    setTimer({
      minutes: Math.floor(Object.keys(questions.key || {}).length - 1),
      seconds: 59,
    });
    try {
      // console.log(questions.key);
      const noOfQuestion = Object.keys(questions.key).length;
      if (noOfQuestion == 0) {
        navigate(`/topList/1`);
      }
    } catch {
      navigate(`/topList/1`);
    }

    // console.log(questions.key.length());
  }, [questions.key]);

  useEffect(() => {
    if (id_list.length > 0 && actualQuestions[id_list[count]]) {
      setcurrentQuestion(actualQuestions[id_list[count]]);
    }
  }, [id_list, count]);

  // useEffect(() => {
  //   console.log(actualQuestions.length);
  //   if (actualQuestions.length == 0) {
  //     navigate(`/topList/1`);
  //   }
  // }, [actualQuestions]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.minutes === 0 && timer.seconds === 0) {
        // Time is up, stop the quiz and navigate to the result page
        clearInterval(interval);
        handleQuizCompletion();
      } else {
        setTimer((prevTimer) => {
          if (prevTimer.seconds === 0) {
            return { minutes: prevTimer.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTimer, seconds: prevTimer.seconds - 1 };
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleQuizCompletion = () => {
    // Stop the quiz and navigate to the result page
    // Add any additional logic you need before navigating
    for (let eachId of id_list) {
      if (!resultList[eachId]) {
        setResultList((prevResultList) => ({
          ...prevResultList,
          [eachId]: {
            selectedAnswer: "time out",
            isCorrect: false,
          },
        }));
      }
    }
    SetCompleted(true);
  };

  useEffect(() => {
    let lastId = id_list.length;

    if (resultList[lastId]) {
      setAnsweredQuestions(resultList);
      setResultObject((resultObject) => ({
        resultList: resultList,
        topicId: topicIdData,
        languageId: languageIdData,
        level: level,
      }));
    }
  }, [resultList]);

  function changeQuestionNumber() {
    // Move to the next question

    if (count < id_list.length - 1 && isSelected === 0) {
      toast.info("Please select any one option");
    } else if (count < id_list.length - 1) {
      setSelected(0);
      setCount((prevIndex) => prevIndex + 1);
      setCurrentAnswer(null);
    } else {
      // Add the result value for the current question

      // SetCompleted(true);

      setResultObject((resultObject) => ({
        resultList: resultList,
        topicId: topicIdData,
        languageId: languageIdData,
        level: level,
      }));
      SetCompleted(true);
    }
  }

  useEffect(() => {
    if (id_list.length > 0 && actualQuestions[id_list[count]]) {
      setcurrentQuestion(actualQuestions[id_list[count]]);
    }
  }, [id_list, count, isSelected]);
  useEffect(() => {
    // Set the correct answer for the next question after state update
    setCorrectAnswer(() => currentQuestion["answer"]);
  }, [currentQuestion]);

  function handleAnswer(data, index) {
    if (data) {
      setCurrentAnswer(data);
    }
    setSelected(index);
  }
  useEffect(() => {
    // Check if the selected answer is correct
    const isCorrect = currentAnswer === correctAnswer;

    // Make sure id_list[count] is defined before updating resultList
    if (id_list[count] && isSelected !== 0) {
      // Add the result value for the current question
      setResultList((prevResultList) => ({
        ...prevResultList,
        [id_list[count]]: {
          selectedAnswer: currentAnswer,
          isCorrect: isCorrect,
        },
      }));
    }
  }, [currentAnswer, isSelected, count]);

  useEffect(() => {
    if (isUserActive === false) {
      // Add the result value for the current question
      setResultObject((resultObject) => ({
        resultList: resultList,
        topicId: topicIdData,
        languageId: languageIdData,
        level: level,
      }));
      SetCompleted(true);
    }
  }, [isUserActive]);
  const postResultData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${url}add_resultData/`,
        {
          resultData: resultObject,
        },
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        }
      );

      setNewUserToQuiz(response?.data?.message);

      setResultContent(response?.data?.data);

      setQuestion_id(id_list);
      setLoading(false);
      sessionStorage.removeItem("isUserActive");
      navigate("/resultPage");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    // Check if resultObject is not null and has the necessary properties
    if (
      resultObject &&
      resultObject.resultList &&
      resultObject.topicId &&
      resultObject.languageId &&
      resultObject.level &&
      iscompleted
    ) {
      postResultData();
    }
  }, [resultObject, iscompleted]); // The effect will run whenever resultObject changes

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; // Required for Chrome
      // Display alert message
      const confirmationMessage = "Are you sure you want to leave?";
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    // Add event listener when component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        JSON.parse(sessionStorage.getItem("isUserActive")) ? (
          <section>
            <NavbarForQuiz />
            {loading ? (
              <Spinner />
            ) : (
              <section className="question-page">
                <div className="question-page__title">
                  <div>
                    {topicName}: {count + 1} of {id_list.length} Questions
                  </div>
                  <div className="Question_time">
                    <span>
                      <RiTimerLine />
                    </span>
                    {`${timer.minutes}:${
                      timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds
                    }`}{" "}
                  </div>
                </div>
                <div className="question-page__body">
                  <div className="question-page-content">
                    <form id="questionForm">
                      <span className="question-page-content__questions">
                        {/* {highlightCode(currentQuestion["question"] || "")} */}
                        {currentQuestion["question"] || ""}
                      </span>
                      {currentQuestion["code"] && (
                        <SyntaxHighlighter
                          language={localStorage
                            .getItem("language")
                            .toLowerCase()}
                          style={darcula}
                        >
                          {currentQuestion["code"] || ""}
                        </SyntaxHighlighter>
                      )}

                      <div className="question-page-content__optionParent">
                        {currentQuestion["option"]
                          ? currentQuestion["option"].map((item, index) => (
                              <div
                                key={index}
                                className="question-page-content__options"
                                onClick={() => {
                                  handleAnswer(item, index + 1);
                                }}
                                style={{
                                  backgroundColor:
                                    isSelected == index + 1
                                      ? "#072c50"
                                      : "white",
                                  color:
                                    isSelected == index + 1
                                      ? "white"
                                      : "#072c50",
                                }}
                              >
                                <div key={index}>
                                  <span>
                                    {index == 0 && "A"} {index == 1 && "B"}
                                    {index == 2 && "C"} {index == 3 && "D"}
                                  </span>
                                  {item}
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>

                      <div
                        type="button"
                        name="submit"
                        onClick={changeQuestionNumber}
                      >
                        <Button name="next" />
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
                    </form>
                  </div>
                </div>
              </section>
            )}
          </section>
        ) : (
          <ResultPage />
        )
      ) : (
        <Login />
      )}
    </>
  );
}
