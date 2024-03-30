import React, { useEffect, useState } from "react";
import testContent from "./testContent.css";
import { Navbar } from "../navbar/Navbar";
import Login from "../login/Login";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { AiOutlineLock, AiFillLock } from "react-icons/ai";
import { ImUnlocked, ImLock } from "react-icons/im";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useMyContext } from "../MyContext";
export function TopContent() {
  const navigate = useNavigate();
  const url = "https://mcqbackend.vercel.app/mcq/";
  // const { questions, handleQuestion } = useMyContext();
  // console.log(questions, "TopContent");

  // getting value from useParams
  let { id } = useParams();
  const [data, setData] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}get_topic/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        });
        // console.log(response?.data);
        if (response?.data) {
          setData(response?.data?.topic);
        } else {
          toast.info("topic unavaiable");
          navigate(`/topList/${id}`);
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
    // console.log("data", data);
    const array = [];
    if (data) {
      for (let eachData of data) {
        // console.log("eachData", eachData);
        array.push(eachData);
      }
      // console.log("topics", topics);
      setTopics(array);
    } else {
      toast.info("topic unavaiable");
      navigate(`/topList/${1}`);
    }
  }, [data]);

  const userNaivagate = (languageId, topicId, topicName, status) => {
    if (status == "completed" || status == "proceed") {
      navigate(`/testInstruction/${languageId}/${topicId}/${topicName}`);
    } else {
      toast.info("you need to unlock");
    }
  };
  return (
    <>
      {localStorage.getItem("token") ? (
        <section>
          <Navbar />
          {loading ? (
            <Spinner />
          ) : (
            <div className="test-content__parent">
              <div className="test-content__heading">
                <div className="test-content__title">
                  Choose a topic for your quiz.
                </div>
                <div className="test-content">
                  Click your selection to proceed.
                </div>
              </div>
              <div className="test-content-lists">
                {topics.map((item, index) => (
                  <div
                    className={`test-content__listElement topic${item.status}`}
                    key={index}
                    onClick={() => {
                      userNaivagate(
                        item.languageId,
                        item.id,
                        item.topicName,
                        item.status
                      );
                    }}
                  >
                    <p> {item.topicName}</p>
                    <p
                      className="statusIcon"
                      // style={{
                      //   color: `${item.status == "completed" && "#67FF64"}`,
                      // }}
                    >
                      {item.status == "completed" && <LiaCheckDoubleSolid />}
                      {item.status == "lock" && <ImLock />}
                      {item.status == "proceed" && <ImUnlocked />}
                    </p>
                  </div>
                ))}
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
              </div>
            </div>
          )}
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
