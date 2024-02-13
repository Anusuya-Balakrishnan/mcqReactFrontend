// MyContext.js
// import React, { createContext, useState, useContext } from "react";

// const MyContext = createContext();

// function MyContextProvider({ children }) {
//   const [questions, setQuestions] = useState({});

//   function handleQuestion(data) {
//     setQuestions(data);
//   }

//   return (
//     <MyContext.Provider value={{ questions, handleQuestion }}>
//       {children}
//     </MyContext.Provider>
//   );
// }

// // Custom hook to use the context
// function useMyContext() {
//   const context = useContext(MyContext);
//   if (!context) {
//     throw new Error("useMyContext must be used within a MyContextProvider");
//   }
//   return context;
// }

// export { MyContextProvider, useMyContext };
