import React, { useEffect, useState } from "react";
import leaderboard from "./leaderboard.css";
import Login from "../login/Login";
import axios from "axios";
import { Navbar } from "../navbar/Navbar";
import winCup from "./image/trophy.png";
import Spinner from "../Spinner/Spinner";
function LeaderBoardPage() {
  const [resultData, setResultData] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [currentUserId, setCurrentUserId] = useState(0);
  const [loading, setLoading] = useState(true);
  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          url + "leaderBoardApi/",

          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              // You can include other headers as needed
            },
          }
        );

        setResultData(response?.data?.message);
        // Set loading to false once data is fetched
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        // Set loading to false once data is fetched
        setLoading(false);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);
  useEffect(() => {
    // Assuming "currentUser" is a boolean property in resultData
    setCurrentUserData(
      resultData && resultData.filter((item) => item.currentUser)
    );
    // Ensure resultData is an array before calling findIndex
    if (Array.isArray(resultData) && resultData.length > 0) {
      setCurrentUserId(resultData.findIndex((item) => item.currentUser) + 1);
    }

    // Now currentUserData contains an array with only the current user's data
  }, [resultData]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : localStorage.getItem("token") ? (
        <>
          <Navbar />
          <section className="leaderboardPage">
            <div className="leaderboardHeading">
              <div className="leaderboardHeading_title">LeaderBoard</div>
              {/* <div className="leaderboardHeading_subtitle">
                Top {resultData ? resultData.length : ""} Users in the
                Community.
              </div> */}
            </div>
            <div className="leaderboard_table">
              <div className="leaderboard_table_heading">
                <div>Rank</div>
                <div>User</div>
                <div>Points</div>
              </div>
              {currentUserData
                ? currentUserData.map((item, index) => (
                    <React.Fragment key={index}>
                      <div className="leaderboard_item2 currentUser">
                        <div>{currentUserId ? currentUserId : ""}</div>
                        <div>
                          {item.username[0].toUpperCase() +
                            item.username.slice(1)}{" "}
                          <img src={winCup} alt="medal" />
                        </div>
                        <div>{item.result}</div>
                      </div>
                    </React.Fragment>
                  ))
                : ""}

              {resultData ? (
                resultData.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div className="leaderboard_item2">
                        <div>{index + 1}</div>
                        <div>
                          {item.username[0].toUpperCase() +
                            item.username.slice(1)}
                        </div>
                        <div>{item.result}</div>
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (
                <div>No data available</div>
              )}
            </div>
          </section>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default LeaderBoardPage;
