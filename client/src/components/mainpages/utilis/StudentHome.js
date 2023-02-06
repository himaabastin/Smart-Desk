import React,{useContext} from "react";
import { GlobalState } from "../../../GlobalState";
import './StudentHome.css'
import NotFound from "../utilis/NotFound/NotFound";
const StudentHome = () => {
  const state=useContext(GlobalState)
  // console.log("globalstate",state);
const [isStdLogged,setIsStdLogged]=state.studentAPI.isStdLogged
const [isStudent,setIsStudent]=state.studentAPI.isStudent

function LoggedRouter(){
  return <div className="data">
  <h1 className="heading1">SMART DESK</h1>
  </div>;
}
return(
  <>
 
  {
    isStudent&&isStdLogged ? LoggedRouter():NotFound()
  }
  </>
)
 
};

export default StudentHome;
