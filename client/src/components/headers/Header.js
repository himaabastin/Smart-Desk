import React,{useContext} from 'react'
import { GlobalState } from '../../GlobalState'
import AdminHeader from './AdminHeader'
import StudentHeader from './StudentHeader'

function Header() {
    const state=useContext(GlobalState)
    const [isLogged]=state.adminAPI.isLogged
    const [isAdmin]=state.adminAPI.isAdmin
    const [isStudent]=state.studentAPI.isStudent
    const [isStdLogged]=state.studentAPI.isStdLogged
    {if (isAdmin && isLogged) {
        return <AdminHeader/>;
      } else if (isStudent && isStdLogged) {
        return <StudentHeader/>;
      } else {
        return <h1>Teacher Header</h1>
      }}
}

export default Header
