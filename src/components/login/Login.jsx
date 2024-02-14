import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom/client";
import Context from "../Context";
import { Link } from "react-router-dom";
import login from "./login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
import { Home } from "../home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { registerId, setRegisterId } = useContext(Context);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const userRef = useRef(null);
  const errorRef = useRef(null);
  const url = "https://mcqbackend.vercel.app/mcq/";

  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigateSignup = () => {
    navigate("/signup");
  };
  // useEffect(() => {
  //   userRef.current.focus();
  // });
  // useEffect(() => {
  //   var retrievedToken = localStorage.getItem("token");
  //   // localStorage.removeItem("token");
  //   // localStorage.removeItem("username");
  //   if (retrievedToken != undefined) {
  //     setToken(retrievedToken);
  //     console.log("retrievedToken", retrievedToken);
  //   }
  // }, []);

  useEffect(() => {
    // Focus on the input element when the component mounts
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const result = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const response = await axios.post(url + "custom_user_check/", {
          oceanRegisterNo: user,
        });
        if (response?.data?.message) {
          setRegisterId(user);
          setError(false);
          setErrorMessage("");
          navigate("/passwordPage");
        } else {
          setError(true);
          setErrorMessage("Invalid Register Number");
        }
        setUser("");
        // localStorage.setItem("token", response?.data?.token);
        // localStorage.setItem("username", response?.data?.user?.studentName);
        // setToken(response?.data?.token);
        // setError(false);
      } catch (error) {
        setUser("");
        setError(true);
        setErrorMessage("Invalid Register Number");
      }
    } else {
      setError(true);
      setErrorMessage("Enter Register Number");
    }
  };

  return (
    <>
      {localStorage.getItem("token") != null ? (
        <section>
          <Home />
        </section>
      ) : (
        <section>
          <div className="home-page">
            <div className="home-page__logo">
              <img src={oaLogo} alt="" />
            </div>
            <div className="home-page__signin-box">
              <form onSubmit={result}>
                <div className="home-page__sigin-box-title">SIGN IN</div>

                <div className="home-page__sigin-box-middleBox">
                  <input
                    type="text"
                    ref={userRef}
                    onChange={(e) => {
                      setUser(e.target.value.toUpperCase());
                    }}
                    placeholder="Enter Ocean Register No"
                    name="oceanRegisterNo"
                    value={user}
                    autoComplete="OFF"
                  />
                  <br />
                  <div
                    className="errorMessage"
                    style={{
                      color: "red",
                      display: error ? "block" : "none",
                      paddingBottom: "10px",
                    }}
                  >
                    {errorMessage}
                  </div>
                  <div className="signup_box">
                    Don’t have an account?{" "}
                    <span onClick={navigateSignup}>Sign Up</span>
                  </div>
                </div>
                <div className="sigin-box__button">
                  <button className="button">Next</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
