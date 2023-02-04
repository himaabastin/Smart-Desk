import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import NotFound from "../utilis/NotFound/NotFound";
import Swal from "sweetalert2";
import "./AdminProfile.css";

const AdminProfile = () => {
  const state = useContext(GlobalState);

  // console.log("globalstate", state);
  const [isLogged, setIsLogged] = state.adminAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
  const [adminDetails, setAdminDetails] = useState({});
  function LoggedRouter() {
    const GetAdmin = async (e) => {
      try {
        const res = await axios.get("/admin/refresh_token");
        console.log(res.data.adminDetails);
        // console.log("set", setAdminDetails(res.data.adminDetails));
        setAdminDetails(res.data.adminDetails);
      } catch (err) {
        console.log(err.response.data.msg, "error");

        Swal.fire({
          text: err.response.data.msg,
          confirmButtonColor: "#b8121b",
        });
      }
    };

    useEffect(() => {
      GetAdmin();
    }, []);

    return (
      <div className="main">
        <div className="container emp">
        <div className="profile-container">
  <img src={adminDetails.avatar} alt="Profile Picture"/>
  
  <h1><i>{adminDetails.name}</i></h1>
  <h3>({adminDetails.role})</h3>
  
  <p>{adminDetails.email}</p>
  <p>{adminDetails.mobile}</p>
</div>
        </div>
        <button className="Button-style">Change Profile Pic</button>
      </div>
    );
  }
  return (
    <>
    
      {isAdmin && isLogged ? LoggedRouter() : NotFound()}

    </>
  );
};

export default AdminProfile;
