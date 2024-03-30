import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from "react-dom/client";
import testList from "./testList.css";
import pythonLogo from "./image/pythonLogo.svg";
import light from "./image/light.svg";
import { Navbar } from "../navbar/Navbar";
import axios from "axios";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export function TopList() {
  const [data, setData] = useState([]);
  const [languageList, setlanguageList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  // getting value from useParams
  let { id } = useParams();
  const url = "https://mcqbackend.vercel.app/mcq/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}get_language/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        });

        if (response) {
          setData(response?.data?.languages);
        } else {
          toast.info("data unavaiable");
        }

        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  useEffect(() => {
    const array = [];
    for (let eachData of data) {
      array.push(eachData);
    }

    setlanguageList(array);
  }, [data]);

  const contentNavigate = (id) => {
    navigate(`/content/${id}`);
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          {loading ? (
            <Spinner />
          ) : (
            <section className="mcqTestList">
              <div class="mcqTestList__Title">
                <h1>Explore Topics</h1>
                <p>Choose a Language to Dive Deeper:</p>
              </div>
              <div class="MCQTest__Box-parent">
                {languageList.map((item, index) => (
                  <div className="MCQ-list__Each-test">
                    <div
                      key={index}
                      onClick={() => {
                        localStorage.setItem("language", item.languageName);
                        contentNavigate(item.id);
                      }}
                    >
                      <div class="MCQTest__Box">
                        <div class="MCQTest__Box-title">
                          <div class="MCQTest__Box-title__image">
                            <img src={pythonLogo} alt="python logo" />
                          </div>

                          <p>{item.languageName} MCQs</p>
                        </div>
                        <div class="MCQTest__Box-content">
                          <p>Average Score: 4</p>
                          <p>No of Participants : 2502</p>
                          {/* <p>
                        <img src={light} alt="light" /> Beginner
                      </p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
            </section>
          )}
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
