import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Login from "../login/Login";
import { Navbar } from "../navbar/Navbar";
import Spinner from "../Spinner/Spinner";
import "./completedTopicStyle.css";
import Button from "../questionPage/Button";
function CompletedTopic() {
  let { languageId } = useParams();
  const [userData, setUserData] = useState();

  const url = "https://mcqbackend.vercel.app/mcq/";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url + `resultTopicList/${languageId}/`,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );
        setUserData(response?.data);
        // console.log(response?.data);

        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };
    fetchData(); // Call the async function immediately
  }, [languageId]);

  return (
    <>
      {localStorage.getItem("token") && userData ? (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <section>
              <Navbar />
              <div className="completedTopic_container">
                <div className="container_child1">
                  <div className="child1_title">Java</div>
                  <div className="child1_range">
                    <div className="range_scale">
                      <div className="range_scale_child"></div>
                    </div>
                    <div className="title_content">
                      <div>
                        {userData["completedTopicCount"]}/
                        {userData["Totaltopic"]} Answered
                      </div>
                      <div className="percent">
                        {Math.floor(
                          (userData["completedTopicCount"] /
                            userData["Totaltopic"]) *
                            100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container_child2">
                  <div className="child2_title">Topic Completed</div>
                  <div className="child2_content">
                    {userData["topicIdList"].map((item, index) => {
                      return (
                        <div className="each_content" key={index}>
                          <p>{item["topicName"]}</p>
                          <div>
                            <Button name="View Result" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div cl></div>
              </div>
            </section>
          )}
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default CompletedTopic;
