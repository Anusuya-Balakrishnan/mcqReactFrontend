import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import home from "./home.css";
import { Navbar } from "../navbar/Navbar";
import Login from "../login/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Spinner/Spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import image from "./images/5.svg";
import Button from "../questionPage/Button";
// import image from "./images/2.svg";
export function Home() {
  // const array = ["Programming", "Testing"];
  const [data, setData] = useState([]);
  const [mcqList, setMcqList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const url = "https://mcqbackend.vercel.app/mcq/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "get_mcqList/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            // You can include other headers as needed
          },
        });

        setData(response?.data?.mcqList);
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
    const array = [];
    for (let eachData of data) {
      array.push(eachData);
    }

    setMcqList(array);
  }, [data]);

  const userNavigate = (id) => {
    navigate(`/topList/${id}`);
  };
  const clickAction = () => {};
  return (
    <>
      {localStorage.getItem("token") ? (
        <div className="Homepage">
          <Navbar />
          {loading ? (
            <Spinner />
          ) : (
            <div className="MCQHomePage_Container">
              <div className="MCQListPage__body">
                <div className="MCQListPage__title">
                  <h1 className="title">Welcome to Ocean Academy!</h1>
                  <p className="subtitle1">
                    Navigate the World of Knowledge with Our Engaging Quizzes
                  </p>
                  <img src={image} />
                  <p className="subtitle2">Explore Quizzes</p>
                  <p className="content">
                    Dive into a world of curiosity and test your knowledge
                    across various subjects. Select a quiz from our range of
                    captivating quizzes that cater to all interests.
                  </p>
                </div>

                <div className="MCQ-lists">
                  {mcqList.map((item, index) => (
                    <div className="MCQ-lists_subParent" key={index}>
                      <div
                        className="MCQ-list__Each-test"
                        key={index}
                        onClick={() => {
                          if (item.mcqName.toLowerCase() === "programming") {
                            userNavigate(item.id);
                          } else {
                            toast.info("Not opened up");
                          }
                        }}
                      >
                        <Button
                          name={`${
                            item.mcqName[0].toUpperCase() +
                            item.mcqName.slice(1)
                          }
                          Quizzes`}
                        />
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
                      {/* <p
                    style={{
                      display:
                        item.mcqName === "programming" ? "none" : "block",
                      color: "red",
                    }}
                  >
                    yet to unlock
                  </p> */}
                    </div>
                  ))}
                </div>
              </div>
              <img src={image} className="mcqHomeImage" />
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
// export default Home;
