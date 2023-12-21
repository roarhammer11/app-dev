// import logo from './logo.svg';
import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Index";
import Dashboard from "./components/Dashboard";
import {faBell} from "@fortawesome/fontawesome-free-solid";
import {fas} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
fontawesome.library.add(fas, faBell);
function App() {
  React.useEffect(() => {
    const adminNavbar = document.getElementById("adminNavbar");
    const facultyNavbar = document.getElementById("facultyNavbar");
    const studentNavbar = document.getElementById("studentNavbar");
    var userType = sessionStorage.getItem("userType");
    if (userType !== null) {
      if (window.location.href === "http://localhost:3000/") {
        adminNavbar.hidden = true;
        facultyNavbar.hidden = true;
        studentNavbar.hidden = true;
      } else if (userType === "admin") {
        adminNavbar.hidden = false;
      } else if (userType === "faculty") {
        facultyNavbar.hidden = false;
      } else if (userType === "student") {
        studentNavbar.hidden = false;
      }
      if (window.location.href !== "http://localhost:3000/") {
        window.history.pushState(null, null, window.location.href);

        window.onpopstate = function (event) {
          if (window.location.href === "http://localhost:3000/") {
            window.history.go(1);
          }
        };
      }
    }
  }, []);
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
