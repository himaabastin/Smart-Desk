import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import NotFound from './NotFound/NotFound'
import "./TeacherHome.css"
const TeacherHome = () => {
  const state=useContext(GlobalState)
  // console.log("globalstate",state);
const [isTchrLogged,setIsTchrLogged]=state.teacherAPI.isTchrLogged
const [isTeacher,setIsTeacher]=state.teacherAPI.isTeacher

function LoggedRouter(){
  return<div>
   <div className="background">
    <div className="banner">
    <h1 className="two">SMART DESK-Teacher
    <span >
      Learn Together
      <br/>
       <b>
        <i>
        “It is the supreme art of the teacher to awaken joy in creative expression and knowledge.”

        </i>
      </b>
   
      <br/>
      -                                                            Albert Einstein
      </span>
      </h1>
    </div>
<div>
  <div className='Tchrdiv'>

 
<div className="boxForTchr">
  <div><Link to="/tchrViewStds"><button className='ButtonTchr'>Students</button></Link></div>
  <div><Link to="/timeTableTchr"><button className='ButtonTchr'>Timetable</button></Link></div>
  <div><button className='ButtonTchr'>Marks</button></div>
  <div><button  className='ButtonTchr'>Teachers </button></div>
 
</div>
</div>     
</div>
  </div>
</div> 
}
return(
  <>
 
  {
    isTeacher&&isTchrLogged ? LoggedRouter():""
  }
  </>
)
 
}

export default TeacherHome
