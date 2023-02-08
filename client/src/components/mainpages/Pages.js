import React,{useContext} from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";
import NotFound from "./utilis/NotFound/NotFound";
import { GlobalState } from "../../GlobalState";
import AdminProfile from "./adminProfile/AdminProfile";
import StudentManagement from "./StudentManagement/StudentManagement";
import StudentRegister from "./StudentRegister/StudentRegister";
import StudentLogin from "./studentlogin/StudentLogin"
import StudentHome from "./utilis/StudentHome";
import TeacherRegister from "./TeacherRegister/TeacherRegister";
import TeacherManagement from "./TeacherManagement/TeacherManagement";
import TeacherHome from "./utilis/TeacherHome";
import TeacherLogin from "./TeacherLogin/TeacherLogin";
import Home from "../Home";
import AdminEditStd from "./AdminEditStd/AdminEditStd";
import AdminProfileEdit from "./AdminProfileEdit/AdminProfileEdit";
const Pages = () => {
  const state=useContext(GlobalState)
  const [isLogged]=state.adminAPI.isLogged
  const [isAdmin]=state.adminAPI.isAdmin
  const [isStudent]=state.studentAPI.isStudent
  const [isStdLogged]=state.studentAPI.isStdLogged
  const [isTeacher] =state.teacherAPI.isTeacher
  const [isTchrLogged]=state.teacherAPI.isTchrLogged

  console.log("Pages",state);
  return (
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/adminHome" element={<AdminHome/>} />
      <Route exact path="/teacherHome" element={<TeacherHome/>} />
      <Route exact path="/studentHome" element={<StudentHome/>} />
      <Route exact path="/adminLogin" element={isLogged?<NotFound/> : <AdminLogin/>} />
      <Route exact path="/adminRegister" element={isLogged ? <NotFound/> : <AdminRegister/>} />
      <Route exact path="/adminProfile" element={<AdminProfile/>} />
      <Route exact path="/studentManagement" element={isAdmin && isLogged? <StudentManagement/>:<NotFound/>} />
      <Route exact path="/studentRegister" element={isAdmin && isLogged? <StudentRegister/>:<NotFound/>} />
      <Route exact path="/studentLogin" element={isStudent ?<NotFound/> : <StudentLogin/>} />
      <Route exact path="/teacherRegister" element={<TeacherRegister/>} />
      <Route exact path="/teacherManagement" element={isAdmin && isLogged? <TeacherManagement/>:<NotFound/>} />
      <Route exact path="/teacherLogin" element={isTchrLogged?<NotFound/> : <TeacherLogin/>} />
      <Route exact path="/adminEditStd/:id" element={isAdmin && isLogged? <AdminEditStd/>:<NotFound/>} />
      <Route exact path="/adminProfileEdit" element={isAdmin && isLogged? <AdminProfileEdit/>:<NotFound/>} />



     




      <Route  path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Pages;
