import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "./AdminHome";
import AdminLogin from "./auth/AdminLogin";
import AdminRegister from "./auth/AdminRegister";
import NotFound from "./utilis/NotFound/NotFound";
const Pages = () => {
  return (
    <Routes>
      <Route exact path="/adminHome" element={<AdminHome/>} />
      <Route exact path="/adminLogin" element={<AdminLogin/>} />
      <Route exact path="/adminRegister" element={<AdminRegister/>} />

      <Route  path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default Pages;
