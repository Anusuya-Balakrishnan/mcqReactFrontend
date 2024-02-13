import React, { useContext, useState } from "react";
import ReactDOM from "react-dom/client";
import navbar from "./navbar.css";
import dhoni from "./images/dhoni.jpg";
import oaLogo from "./images/oceanacademy Logo.svg";
import newoaLogo from "./images/oaLogo.svg";
import medal from "./images/medal.svg";
import { useNavigate } from "react-router-dom";
import { MdOutlinePersonOutline } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";
import Context from "../Context";
import axios from "axios";

export function NavbarForQuiz() {
  const { isUserActive, setIsUserActive } = useContext(Context);
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();
  const exitTest = () => {
    const storedValue = JSON.parse(sessionStorage.getItem("isUserActive"));

    const isUserActiveValue = storedValue ? JSON.parse(storedValue) : false;
    if (isUserActiveValue) {
      console.log("isUserActive deleted");
      sessionStorage.removeItem("isUserActive");
      setIsUserActive(false);
    }
  };

  return (
    <section className="MCQListPage">
      <div className="MCQ-Navbar">
        <div
          className="MCQ-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={newoaLogo} alt="" />
        </div>
        <ul className="mcq_secondChild">
          <li className="mcq_subchild mcq_personProfile">
            <span> {userName[0].toUpperCase() + userName.slice(1)} </span>
            <span className="icon">
              <MdKeyboardArrowDown />
            </span>
            <ul>
              <li onClick={exitTest}>Exit Test</li>
            </ul>
          </li>
        </ul>
        <div className="sideMenu">
          <AiOutlineMenu />
          <ul className="sideMenu_option">
            <li onClick={exitTest}>exit Test</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
