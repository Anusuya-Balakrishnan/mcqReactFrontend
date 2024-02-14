import React, { useEffect, useState } from "react";
import testContent from "./testContent.css";
import { Navbar } from "../navbar/Navbar";
import Login from "../login/Login";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
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

        setData(response?.data?.topic);
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
    for (let eachData of data) {
      // console.log("eachData", eachData);
      array.push(eachData);
    }
    // console.log("topics", topics);
    setTopics(array);
  }, [data]);

  const userNaivagate = (languageId, topicId, topicName) => {
    navigate(`/testInstruction/${languageId}/${topicId}/${topicName}`);
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : localStorage.getItem("token") ? (
        <section>
          <Navbar />

          <div className="test-content__parent">
            <div className="test-content__heading">
              <div className="test-content__title">
                Choose a topic to focus your quiz questions.
              </div>
              <div className="test-content">
                Click your selection to proceed.
              </div>
            </div>
            <div className="test-content-lists">
              {topics.map((item, index) => (
                <div
                  className="test-content__listElement"
                  key={index}
                  onClick={() => {
                    userNaivagate(item.id, item.languageId, item.topicName);
                  }}
                >
                  {item.topicName}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <Login />
      )}
    </>
  );
}
