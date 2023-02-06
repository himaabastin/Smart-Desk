import React,{useContext} from "react";
import { GlobalState } from "../../GlobalState";
import './utilis/NotFound/AdminHome.css'
import NotFound from "./utilis/NotFound/NotFound";
const AdminHome = () => {
  const state=useContext(GlobalState)
  // console.log("globalstate",state);
const [isLogged,setIsLogged]=state.adminAPI.isLogged
const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin

function LoggedRouter(){
  return <div className="data">
  <h1 className="heading1">SMART DESK -ADMIN</h1>
  </div>;
}
return(
  <>
  
  {
   isAdmin && isLogged ? LoggedRouter():NotFound()
  }
  </>
)
 
};

export default AdminHome;
