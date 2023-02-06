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
const Pages = () => {
  const state=useContext(GlobalState)
  const [isLogged]=state.adminAPI.isLogged
  const [isAdmin]=state.adminAPI.isAdmin
  const [isStudent]=state.studentAPI.isStudent
  return (
    <Routes>
      <Route exact path="/adminHome" element={<AdminHome/>} />
      <Route exact path="/adminLogin" element={isLogged?<NotFound/> : <AdminLogin/>} />
      <Route exact path="/adminRegister" element={isLogged ? <NotFound/> : <AdminRegister/>} />
      <Route exact path="/adminProfile" element={<AdminProfile/>} />
      <Route exact path="/studentManagement" element={isAdmin && isLogged? <StudentManagement/>:<NotFound/>} />
      <Route exact path="/studentRegister" element={isAdmin && isLogged? <StudentRegister/>:<NotFound/>} />
      <Route exact path="/studentLogin" element={isStudent ?<NotFound/> : <StudentLogin/>} />
      <Route exact path="/studentHome" element={<StudentHome/>} />
      <Route exact path="/teacherRegister" element={<TeacherRegister/>} />
      <Route exact path="/teacherManagement" element={isAdmin && isLogged? <TeacherManagement/>:<NotFound/>} />

     




      <Route  path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Pages;
