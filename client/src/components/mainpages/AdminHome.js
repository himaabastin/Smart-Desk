import React,{useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import {Link} from "react-router-dom"
// import NotFound from './NotFound/NotFound'
import "./AdminHome.css"
const AdminHome = () => {
  const state=useContext(GlobalState)
  // console.log("globalstate",state);
const [isLogged,setLogged]=state.adminAPI.isLogged
const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin

function LoggedRouter(){
  return<div>
   <div className="adminbackground">
    <div className="adminbanner">
    <h1 className="admintwo">SMART DESK-Admin

      </h1>
    </div>
<div>
  <div className='admindiv'>

 
<div className="boxForAdmin">
  <div><Link to="/studentManagement"><button className='ButtonAdmin'>Students</button></Link></div>
  <div><Link to="/teacherManagement"><button className='ButtonAdmin'>Teachers</button></Link></div>
  <div><button className='ButtonAdmin'>Payments</button></div>
  <div><button  className='ButtonAdmin'>Teachers </button></div>
 
</div>
</div>     
</div>
  </div>
</div> 
}
return(
  <>
 
  {
    isAdmin&&isLogged ? LoggedRouter():""
  }
  </>
)
 
}

export default AdminHome
