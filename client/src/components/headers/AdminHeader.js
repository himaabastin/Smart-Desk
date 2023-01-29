import React,{useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import Menu from './icons/menu-icon.svg'
// import Close from './icons/close.svg'
import Logo from './icons/logo.png'
import {Link} from 'react-router-dom'
import './header.css'
const AdminHeader = () => {
    const value=useContext(GlobalState)
  return (
    <header>
      <div className='menu'>
    <img src={Menu} width='25'/>
      </div>
<div className='logo'>
  <Link to='/adminHome'><img src={Logo} width='70' className='LOGO' /></Link>
  
</div>
<div>
<ul>
  <li className='NAMES'>Admin</li>
  <li className='NAMES'><Link to='/adminLogin' className='NAMES'>Login</Link></li>

  <li className='NAMES'><Link to='/adminLogout' className='NAMES'>Logout</Link></li>
  {/* <li>
    <img src={Close} width='20'/>
  </li> */}
</ul> 
</div>



    </header>
  )
}

export default AdminHeader
