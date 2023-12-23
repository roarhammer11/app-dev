// import logo from './logo.svg';
import "./App.css";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Index";
import Dashboard from "./components/Dashboard";
import {faBell, faArrowRight} from "@fortawesome/fontawesome-free-solid";
import {fas} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
fontawesome.library.add(fas, faBell, faArrowRight);
function App() {
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
