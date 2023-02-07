import axios from "axios";
import React,{useContext,useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import Swal from "sweetalert2";
import "./AdminSidebar.css";



function Sidebar(){
  const state = useContext(GlobalState);
  // console.log("globalstate", state);
  const [isLogged, setIsLogged] = state.adminAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
  const [adminDetails,setAdminDetails]=useState({})


     

      useEffect(() => {
        const GetAdmin = async (e) => {
          try {
            const res = await axios.get("/admin/refresh_token");
            console.log("for sidebar",res.data.adminDetails);
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
        GetAdmin()
      }, [])

      return (

        <div className="sidebar">
          <div className="side-menu">
            <center>
              <img src={adminDetails.avatar} />
              <br />
              <h4><i>{adminDetails.name}</i></h4>
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
function AdminSidebar() {
  const state = useContext(GlobalState);
  // console.log("globalstate", state);
  const [isAdmin, setIsAdmin] = state.adminAPI.isAdmin;
 return(
  <>
  {isAdmin?<Sidebar/>:""}
  </>

 )
 

  
}

export default AdminSidebar;
