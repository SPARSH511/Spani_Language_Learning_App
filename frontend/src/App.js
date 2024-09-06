import React from "react";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Homepage from "./components/Homepage";
import Aboutus from "./components/Aboutus";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import StudentHome from "./Screens/Student/Home";
import AdminHome from "./Screens/Admin/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Provider store={mystore}>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="student" element={<StudentHome />} />
            <Route path="admin" element={<AdminHome />} />
          </Routes>
        </Router>
        <ToastContainer />
      </Provider>
    </>
  );
};

export default App;
