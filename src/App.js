import React, { createContext, useState, useContext } from "react";
import "./App.css";

import { Home } from "./components/home/Home";
import Login from "./components/login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Signup } from "./components/signup/Signup";
import { TopList } from "./components/topicList/TopList";
import { QuestionPage } from "./components/questionPage/QuestionPage";
import { TopContent } from "./components/topContent/TopContent";
import { TestInstruction } from "./components/testInstruction/TestInstruction";
import { ResultPage } from "./components/resultPage/ResultPage";
import { MyContextProvider } from "./components/MyContext.jsx";
// import { createContext } from "react";
import Context from "./components/Context.jsx";
import LeaderBoardPage from "./components/leaderboard/LeaderBoardPage.jsx";
import PasswordPage from "./components/password/PasswordPage.jsx";
import { NavbarForQuiz } from "./components/navbar/NavbarForQuiz.jsx";

function App() {
  const contextValue = useContext(Context);
  const [registerId, setRegisterId] = useState("");
  const [questions, setQuestions] = useState({});
  const [question_id, setQuestion_id] = useState({});
  const [isUserActive, setIsUserActive] = useState();
  const [newUserToQuiz, setNewUserToQuiz] = useState(false);
  const [resultContent, setResultContent] = useState({});
  return (
    <div className="App">
      <BrowserRouter>
        <Context.Provider
          value={{
            questions,
            setQuestions,
            question_id,
            setQuestion_id,
            registerId,
            setRegisterId,
            isUserActive,
            setIsUserActive,
            resultContent,
            setResultContent,
            newUserToQuiz,
            setNewUserToQuiz,
          }}
        >
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/passwordPage" element={<PasswordPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/topList/:id" element={<TopList />} />
            <Route path="/content/:id" element={<TopContent />} />
            <Route
              path="/testInstruction/:languageId/:topicId/:topicName"
              element={<TestInstruction />}
            />
            <Route path="/testPage/:topicName" element={<QuestionPage />} />
            <Route path="/resultPage" element={<ResultPage />} />
            <Route path="/leaderBoardPage" element={<LeaderBoardPage />} />
            <Route path="/quiz" element={<NavbarForQuiz />} />
          </Routes>
        </Context.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
{
  /* <Home /> */
}
{
  /* <Signup /> */
}
{
  /* <TopList /> */
}
{
  /* <Navbar /> */
}
{
  /* <QuestionPage /> */
}
{
  /* <TopContent /> */
}
{
  /* <TestInstruction /> */
}
{
  /* <ResultPage /> */
}
