import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";
import profileImage from "./image/personprofile.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Home } from "../home/Home";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signup from "./signup.css";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [oceanRegisterNo, setOceanRegisterNo] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const userRef = useRef(null);
  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {
    var retrievedToken = localStorage.getItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("username");
    if (retrievedToken != undefined) {
      setToken(retrievedToken);
      console.log("retrievedToken", retrievedToken);
    }
  }, []);
  useEffect(() => {
    // Focus on the input element when the component mounts
    if (userRef.current !== null) {
      userRef.current.focus();
    }
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const addUser = async (e) => {
    e.preventDefault();
    if (checkData()) {
      try {
        const response = await axios.post(url + "users/", {
          studentName: userName,
          mobileNumber: mobileNumber,
          oceanRegisterNo: oceanRegisterNo,
          email: email,
          password: password,
        });
        setToken(response.data.token);
        setSuccess(true);
        setUserName("");
        setOceanRegisterNo("");
        setMobileNumber("");
        setEmail("");
        setConfirmPassword("");
        setPassword("");
        if (response?.data?.message === true) {
          localStorage.setItem("token", response?.data?.token);
          localStorage.setItem("username", response?.data?.user?.studentName);
          toast.success("successfully registered");
          navigate("/home");
        } else {
          setSuccess(false);
          toast.info("Ocean register number is already in use");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const checkData = () => {
    if (oceanRegisterNo) {
      if (!/OCNST\d{5}/.test(oceanRegisterNo)) {
        toast.info("Ocean register number format is invalid");
        return false;
      }
    } else {
      toast.info("Fill Ocean Register Number");
      return false;
    }
    if (userName) {
      if (!/^[a-zA-Z0-9_]{3,20}$/.test(userName)) {
        toast.info("User Name format is invalid");
        return false;
      }
    } else {
      toast.info("Fill username field");
      return false;
    }
    if (mobileNumber) {
      if (!/^\d{10}$/.test(mobileNumber)) {
        toast.info("Valid mobile Number format is invalid");
        return false;
      }
    } else {
      toast.info("Fill mobile Number field");
      return false;
    }
    if (email) {
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        toast.info("Email format is invalid");
        return false;
      }
    } else {
      toast.info("Fill email field");
      return false;
    }
    if (password) {
      if (!/^.{5,10}$/.test(password)) {
        toast.info("Enter a valid password with 5 to 10 characters.");
        return false;
      }
    } else {
      toast.info("Fill password field");
      return false;
    }
    if (password !== confirmPassword) {
      toast.info(
        "Enter same characters in password and confirm password field"
      );
      return false;
    }

    return true;
  };

  return (
    <>
      {!(success || Boolean(token)) ? (
        <section id="CreateAccount">
          <div className="sign-up-block">
            <div className="sign-up-heading">
              <h1>Join Us Today!</h1>
              <p>Sign Up Now to Become a Member</p>
            </div>
            <form onSubmit={addUser}>
              <div className="sign-up-block-form">
                <div className="sign-up-block-form-content">
                  <input
                    className="signup-Input"
                    type="text"
                    ref={userRef}
                    placeholder="Ocean Register No"
                    onChange={(e) => {
                      setOceanRegisterNo(e.target.value.toUpperCase());
                    }}
                    value={oceanRegisterNo}
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="text"
                    placeholder="Enter your Full Name"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    value={userName}
                  />
                  <br />

                  <input
                    type="tel"
                    className="signup-Input"
                    placeholder="Enter your Mobile Number"
                    name="mobileNumber"
                    autoComplete="off"
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                    value={mobileNumber}
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="email"
                    placeholder="Enter your Email Id"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name={email}
                  />
                  <br />
                  <input
                    className="signup-Input"
                    type="password"
                    placeholder="Enter new password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name={password}
                  />

                  <br />
                  <input
                    className="signup-Input"
                    type="password"
                    placeholder="Enter Confirm password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    name={confirmPassword}
                  />

                  <br />
                </div>
              </div>
              <div className="sign-up__button">
                <button className="btn">Sign Up</button>
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
        </section>
      ) : (
        <>
          <Home />
        </>
      )}
    </>
  );
}

// <div class="sign-up-block-form-content">
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Qualification"
//                     name="qualification"
//                     onChange={(e) => {
//                       setQualification(e.target.value);
//                     }}
//                     value={qualification}
//                     required
//                   />
//                   <br />
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Nationality"
//                     name="nationality"
//                     onChange={(e) => {
//                       setNationality(e.target.value);
//                     }}
//                     value={nationality}
//                     required
//                   />
//                   <br />
//                   <input
//                     className="signup-Input"
//                     type="text"
//                     placeholder="Working Designation"
//                     name="workingDesignation"
//                     onChange={(e) => {
//                       setWorkingDesignation(e.target.value);
//                     }}
//                     value={workingDesignation}
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     className="signup-Input"
//                     placeholder="College Name(if Student)"
//                     name="collegeName"
//                     onChange={(e) => {
//                       setCollegeName(e.target.value);
//                     }}
//                     value={collegeName}
//                   />
//                   <br />
//                   <input
//                     type="tel"
//                     class="signup-Input"
//                     placeholder="Whatsapp Number"
//                     name="whatsappNumber"
//                     required
//                     onChange={(e) => {
//                       setWhatsappNumber(e.target.value);
//                     }}
//                     value={whatsappNumber}
//                   />
//                   <br />
//                   <input
//                     type="text"
//                     placeholder="Gender"
//                     name="gender"
//                     onChange={(e) => {
//                       setGender(e.target.value);
//                     }}
//                     value={gender}
//                     required
//                   />
//                 </div>
//                 <div class="sign-up-block-form-image">
//                   <img
//                     src={profileImage}
//                     alt="personprofile"
//                     name="profileImage"
//                   />
//                   <div class="sign-up-form-image-upload">+</div>
//                 </div>
