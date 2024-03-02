import React from "react";
import questionPage from "./questionPage.css";
import { useEffect, useContext, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Context from "../Context";
function ShowResult() {
  const { finalResult, setFinalResult } = useContext(Context);

  return (
    <>
      {finalResult.map((currentQuestion, index) => {
        return (
          <div className="question-page-content" key={index}>
            {currentQuestion["question"]}
          </div>
        );
      })}
    </>
  );
}

export default ShowResult;
