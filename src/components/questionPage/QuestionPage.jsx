import React, { useEffect, useContext, useState } from "react";
// import MyContext, { useMyContext } from "../MyContext";
import Context from "../Context";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
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
  const [timer, setTimer] = useState(10);
  const [loading, setLoading] = useState(false);
  const [mins, setMins] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {
    setActualQuestions(questions.key || {});
    setId_list(Object.keys(questions.key || {}));
  }, [questions.key]);

  useEffect(() => {
    if (id_list.length > 0 && actualQuestions[id_list[count]]) {
      setcurrentQuestion(actualQuestions[id_list[count]]);
      setMins(id_list.length - 1);
      setSeconds(60);
    }
  }, [id_list, count]);

  function changeQuestionNumber() {
    // Move to the next question

    if (count < id_list.length - 1 && isSelected === 0 && mins !== 0) {
      toast.info("Please select any one option");
    } else if (count < id_list.length - 1) {
      setSelected(0);
      setCount((prevIndex) => prevIndex + 1);
      setCurrentAnswer(null);
    } else {
      // Add the result value for the current question

      setResultObject((resultObject) => ({
        resultList: resultList,
        topicId: topicIdData,
        languageId: languageIdData,
        level: level,
      }));
    }
  }

  // // Function to decrement the timer by 1 second
  // const decrementTimer = () => {
  //   if (seconds > 0) {
  //     setSeconds((prevTimer) => prevTimer - 1);
  //   }
  // };

  // // Effect to decrement the timer every second
  // useEffect(() => {
  //   const timerInterval = setInterval(decrementTimer, 1000);

  //   // Clear the interval when the component unmounts or the timer reaches 0
  //   return () => clearInterval(timerInterval);
  // }, []);

  // // Effect to handle actions when the timer reaches 0
  // useEffect(() => {
  //   if (seconds == 0) {
  //     setMins((prevValue) => prevValue - 1);
  //     setSeconds(60);
  //   }
  // }, [mins]);
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
    }
  }, [isUserActive]);
  const postResultData = async () => {
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
      if (isUserActive) {
        sessionStorage.removeItem("isUserActive");
      }
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
      resultObject.level
    ) {
      setLoading(true);
      postResultData();
    }
  }, [resultObject, resultList, topicIdData, languageIdData, level]); // The effect will run whenever resultObject changes

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
                  {/* <div className="Question_time">
                  <span>
                    <RiTimerLine />
                  </span>
                  {mins} mins:{seconds} secs
                </div> */}
                </div>
                <div className="question-page__body">
                  <div className="question-page-content">
                    <form id="questionForm">
                      <span className="question-page-content__questions">
                        {currentQuestion["question"] || ""}
                      </span>
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
                                <div key={index}>{item}</div>
                              </div>
                            ))
                          : ""}
                      </div>

                      <button
                        type="button"
                        className="question-page-content__submit"
                        name="submit"
                      >
                        <div onClick={changeQuestionNumber}> next </div>
                      </button>
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
