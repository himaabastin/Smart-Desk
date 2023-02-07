import React,{useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from './icons/menu-icon.svg'
import Logo from "./icons/logo.png"
import {Link} from "react-router-dom"
import axios from 'axios'
import "./header.css"


function AdminHeader() {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.adminAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
  const logoutAdmin = async () => {
    await axios.get("/admin/adminLogout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };
  return (
    <header className='adminHeader'>
           <div className="menu">
        <img src={Menu} width="25" />
      </div>
      <div className="logo">
        <Link to="/adminHome">
          <img src={Logo} width="70" className="LOGO" />
        </Link>
      </div>

      <ul>
     
        {isAdmin && isLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff" }}>
              <Link to="/adminLogin" onClick={logoutAdmin}>
                <button className="logout-button">adminLogout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

function StudentHeader() {
  const state = useContext(GlobalState);
  const [isStdLogged, setIsStdLogged] = state.studentAPI.isStdLogged;
  const [isStudent, setIsStudent] = state.studentAPI.isStudent;
  const logoutStudent = async () => {
    await axios.get("/student/studentLogout");
    localStorage.clear();
    setIsStudent(false);
    setIsStdLogged(false);
  };
  return (
    <header className='stdHeader'>
           <div className="stdmenu">
        <img src={Menu} width="25" />
      </div>
      <div className="stdlogo">
      <Link to="/studentProfile">
          <p>Profile</p>
        </Link>
        <Link to="/studentHome">
          <img src={Logo} width="70" className="stdLOGO" />
        </Link>
      </div>

      <ul className='stdul'>
     
        {isStudent && isStdLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff" }}>
              <Link to="/studentLogin" onClick={logoutStudent}>
                <button className="stdlogout-button">stdLogout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

function TeacherHeader() {
  const state = useContext(GlobalState);
  const [isTchrLogged, setIsTchrLogged] = state.teacherAPI.isTchrLogged;
  const [isTeacher, setIsTeacher] = state.teacherAPI.isTeacher;
  const logoutTeacher = async () => {
    await axios.get("/teacher/teacherLogout");
    localStorage.clear();
    setIsTeacher(false);
    setIsTchrLogged(false);
  };
  return (
    <header className='tchrHeader'>
           <div className="tchrmenu">
        <img src={Menu} width="25" />
      </div>
      <div className="tchrlogo">
        <Link to="/teacherHome">
          <img src={Logo} width="70" className="tchrLOGO" />
        </Link>
      </div>

      <ul className='tchrul'>
     
        {isTeacher && isTchrLogged && (
          <>
            {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
            <li style={{ color: "#ffff" }}>
              <Link to="/teacherProfile">
              <p className='tchrprofile'>Profile</p>
              </Link>
             
              <Link to="/teacherLogin" onClick={logoutTeacher}>
                <button className="tchrlogout-button">TchrLogout</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

// function NormalHeader(){
//   return(
//     <header className='normalHeader'>
//     <div className="normalmenu">
//  {/* <img src={Menu} width="25" /> */}
// </div>
// <div className="normallogo">
//  <Link to="/">
//    <img src={Logo} width="70" className="normalLOGO" />
//  </Link>
// </div>
// </header>
//   )
// }
function Header() {

  const state = useContext(GlobalState);
  // console.log("globalstate",state);
  const [isStudent, setIsStudent] = state.studentAPI.isStudent;
  const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin
  const [isTeacher,setIsTeacher]=state.teacherAPI.isTeacher





  return (
    <div>
      {isStudent?<StudentHeader/> :
      isAdmin?<AdminHeader/>:
      isTeacher?<TeacherHeader/>:""}
    </div>
  )
}

export default Header
