import React,{useContext} from 'react'
import { GlobalState} from '../../GlobalState'
import Menu from './icons/menu-icon.svg'
// import Close from './icons/close.svg'
import Logo from './icons/logo.png'
import {Link} from 'react-router-dom'
import './header.css'
import axios from 'axios'


const AdminHeader = () => {
    const state=useContext(GlobalState)
    // console.log("globalstate",state);
  const [isLogged,setIsLogged]=state.adminAPI.isLogged
  const [isAdmin,setIsAdmin]=state.adminAPI.isAdmin

const logoutAdmin= async ()=>{
      await axios.get('/admin/adminLogout')
      localStorage.clear()
      setIsAdmin(false)
      setIsLogged(false)


}

function LoggedRouter() {
  return(
    <>
    {/* <li style={{color:"#ffff"}}>ADMIN </li> */}
    <li style={{color:"#ffff"}}><Link to="/adminLogin"onClick={logoutAdmin} ><button className='logout-button'>Logout</button></Link></li>
   
    </>
  )
}
  return (
    <header>
      <div className='menu'>
    <img src={Menu} width='25'/>
      </div>
<div className='logo'>
  <Link to='/adminHome'><img src={Logo} width='70' className='LOGO' /></Link>
  
  
</div>

<ul>
  {isAdmin}
  {
    isLogged ? LoggedRouter():""
  }
</ul> 




    </header>
  )
}

export default AdminHeader
