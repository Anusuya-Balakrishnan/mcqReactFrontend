import React, { useEffect, useState, useRef, useContext } from "react";
import ReactDOM from "react-dom/client";
import Context from "../Context";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../login/login.css";
import oaLogo from "./images/oceanacademyLogoWhite.svg";
import { Home } from "../home/Home";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function PasswordPage() {
  const { registerId, setRegisterId } = useContext(Context);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const errorRef = useRef(null);
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {}, []);
  const navigateSignup = () => {
    navigate("/signup");
  };
  useEffect(() => {
    // Focus on the input element when the component mounts
    if (passwordRef.current !== null) {
      passwordRef.current.focus();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const result = async (e) => {
    e.preventDefault();
    if (password) {
      try {
        const response = await axios.post(url + "userLogin/", {
          oceanRegisterNo: registerId,
          password: password,
        });
        setPassword("");
        setError(false);
        setErrorMessage("");
        if (response?.data?.message) {
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("username", response?.data?.studentName);
          navigate("/home");
          setSuccess(true);
          setToken(response?.data?.token);
        }

        // setToken(response?.data?.token);
        // setError(false);
      } catch (error) {
        setPassword("");
        setError(true);
        setErrorMessage("Invalid Password");
      }
    } else {
      setError(true);
      setErrorMessage("Enter Password");
    }
  };

  return (
    <div>
      <>
        {localStorage.getItem("token") === null && (
          <section>
            <div className="home-page">
              <div className="home-page__logo">
                <img src={oaLogo} alt="" />
              </div>
              <div className="home-page__signin-box">
                <form onSubmit={result}>
                  <div className="home-page__sigin-box-title">SIGN IN</div>
                  <div className="home-page__sigin-box-middleBox">
                    <div className="passwordBox">
                      <input
                        className="passwordInput"
                        // type="password"
                        type={showPassword ? "text" : "password"}
                        ref={passwordRef}
                        onChange={(e) => {
                          setPassword(e.target.value.toUpperCase());
                        }}
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        autoComplete="OFF"
                      />
                      <div
                        className="showPassword"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                      <br />
                    </div>
                    <div
                      className="errorMessage"
                      style={{
                        color: "red",
                        display: error ? "block" : "none",
                      }}
                    >
                      {errorMessage}
                    </div>
                  </div>

                  <div className="sigin-box__button">
                    <button className="button">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}
      </>
    </div>
  );
}

export default PasswordPage;
