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

const Pages = () => {
  const state=useContext(GlobalState)
  const [isLogged]=state.adminAPI.isLogged
  return (
    <Routes>
      <Route exact path="/adminHome" element={<AdminHome/>} />
      <Route exact path="/adminLogin" element={isLogged?<NotFound/> : <AdminLogin/>} />
      <Route exact path="/adminRegister" element={isLogged ? <NotFound/> : <AdminRegister/>} />
      <Route exact path="/adminProfile" element={<AdminProfile/>} />
      <Route exact path="/studentManagement" element={isLogged? <StudentManagement/>:<NotFound/>} />
      <Route exact path="/studentRegister" element={isLogged? <StudentRegister/>:<NotFound/>} />




      <Route  path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Pages;
