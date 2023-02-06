import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu-icon.svg";
// import Close from './icons/close.svg'
import Logo from "./icons/logo.png";
import { Link } from "react-router-dom";
import "./header.css";
import axios from "axios";
import "./StudentHeader.css"
const StudentHeader = () => {
  const state = useContext(GlobalState);
  // console.log("globalstate",state);
  const [isLogged, setIsLogged] = state.studentAPI.isLogged;
  const [isStudent, setIsStudent] = state.studentAPI.isAdmin;

  const logoutAdmin = async () => {
    await axios.get("/student/studentLogout");
    localStorage.clear();
    setIsStudent(false);
    setIsLogged(false);
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} width="25" />
      </div>
      <div className="logo">
        <Link to="/StudentHome">
          <img src={Logo} width="70" className="LOGO" />
        </Link>
      </div>

      <ul>
     
        {isStudent && isLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff" }}>
              <Link to="/studentLogin" onClick={logoutAdmin}>
                <button className="logout-button">Logout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default StudentHeader;
