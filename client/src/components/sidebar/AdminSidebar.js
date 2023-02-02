import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import "./AdminSidebar.css";

function AdminSidebar() {
  const state = useContext(GlobalState);
  console.log("globalstate", state);
  const [isLogged, setIsLogged] = state.adminAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
  function LoggedRouter() {
    return (
      <div className="sidebar">
        <div className="side-menu">
          <center>
            <img src="https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png" />
            <br />
            <h4>Admin Name</h4>
          </center>
          <br />
          <h5>
            <Link className="menus" to="/adminProfile">
              Profile
            </Link>
          </h5>
          <h5>
            <Link className="menus" to="/studentManagement">
              Students
            </Link>
          </h5>
          <h5>
            <Link className="menus" to="/teacherManagement">
              Teachers
            </Link>
          </h5>
          <h5>
            <Link className="menus" to="/paymentManagement">
              Payments
            </Link>
          </h5>
          <h5>
            <Link className="menus" to="/storeManagement">
              Store
            </Link>
          </h5>
          <h5>
            <Link className="menus" to="/adminMessages">
              Messages
            </Link>
          </h5>

          
        </div>
      </div>
    );
  }
  return(
    <>
      {isAdmin}
  {
    isLogged ? LoggedRouter():""
  }
    </>
  )
}

export default AdminSidebar;
