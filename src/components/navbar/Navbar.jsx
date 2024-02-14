import React, { useState, useEffect } from "react";
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
import { useLocation } from "react-router-dom";

import axios from "axios";

export function Navbar() {
  const [userName, setUserName] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = useState("");
  const url = "https://mcqbackend.vercel.app/mcq/";
  const logoutFunction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${url}userLogout/`,
        {},
        {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`, // Include the authorization token
            // You can include other headers as needed
          },
        }
      );
      console.log("Logout response:", response?.data);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      console.log("Deleted successfully:", response?.data?.Message);
      // Refresh the window
      window.location.reload();
    } catch (error) {
      console.error("Error deleting resource:", error);
      // Refresh the window
      window.location.reload();
    }
  };
  useEffect(() => {
    // Extract the pathname from the location object
    const pathname = location.pathname;

    // Set the activePage state to the current pathname
    setActivePage(pathname);
  }, [location.pathname]);
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
          <li
            className="mcq_subchild"
            style={{
              backgroundColor:
                activePage === "/home" || activePage === "/"
                  ? "rgba(255, 255, 255, 0.069)"
                  : "none",
            }}
          >
            <span
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </span>
          </li>
          {/* <li className="mcq_subchild">
            <span>Dashboard</span>
          </li> */}
          <li
            className="mcq_subchild"
            style={{
              backgroundColor:
                activePage === "/leaderBoardPage"
                  ? "rgba(255, 255, 255, 0.069)"
                  : "none",
            }}
          >
            <span
              onClick={() => {
                navigate("/leaderBoardPage");
              }}
            >
              Leaderboard
            </span>
            <img src={medal} alt="medal" />
          </li>
          <li className="mcq_subchild mcq_personProfile">
            <span> {userName[0].toUpperCase() + userName.slice(1)} </span>
            <span className="icon">
              <MdKeyboardArrowDown />
            </span>
            <ul>
              {/* <li>Edit Profile</li> */}
              <li onClick={logoutFunction}>Logout</li>
            </ul>
          </li>
        </ul>
        <div className="sideMenu">
          <AiOutlineMenu />
          <ul className="sideMenu_option">
            <li
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </li>
            {/* <li>Dashboard</li> */}
            <li
              onClick={() => {
                navigate("/leaderBoardPage");
              }}
            >
              Leaderboard
            </li>
            {/* <li>Edit Profile</li> */}
            <li onClick={logoutFunction}>Logout</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="MCQ-sidebar">
  <div className="MCQ-userProfile__leaderBoard">
    <img src={medal} alt="medal" />
    <div
      onClick={() => {
        navigate("/leaderBoardPage");
      }}
    >
      Leader Board
    </div>
  </div>
  <div className="MCQ-userProfile__leaderBoard">
    <div>Dashboard</div>
  </div>

  <div className="MCQ-userProfile-side">
    <div className="MCQ-userProfile">
      <p> {userName[0].toUpperCase() + userName.slice(1)} </p>
      <span>
        <MdKeyboardArrowDown />
      </span>
    </div>
    <div className="MCQ-userProfile__options">
      <div className="editOption">
        <div href=""> Edit Profile </div>
      </div>
      <div className="logoutOption" onClick={logoutFunction}>
        <div href="">Logout</div>
      </div>
    </div>
  </div>
</div>; */
}
