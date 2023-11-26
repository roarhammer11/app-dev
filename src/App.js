// import logo from './logo.svg';
import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/TempLogin";
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
    // else {
    //   document.getElementById("loginForm").hidden = false;
    // }
  }, []);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/home" element={<Home />} />
          <Route path="/my_meetings" element={<My_meetings />} />
          <Route path="/create_meeting" element={<Create_meeting />} />
          <Route path="/available_sched" element={<Available_sched />} />
          <Route path="/faculty_home" element={<FacultyHome />} />
          <Route path="/faculty_meetings" element={<FacultyMeetings />} />
          <Route path="/faculty_schedule" element={<FacultySched />} />
          <Route path="/admin_dashboard" element={<AdminDashboard />} />
          <Route path="/admin_appointments" element={<AdminAppointments />} />
          <Route path="/admin_students" element={<AdminStudents />} />
          <Route path="/admin_faculty" element={<AdminFaculty />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
