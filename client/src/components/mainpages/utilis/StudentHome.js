import React,{useContext} from 'react'
import { GlobalState } from '../../../GlobalState'
import NotFound from './NotFound/NotFound'
import "./StudentHome.css"
const StudentHome = () => {
  const state=useContext(GlobalState)
  // console.log("globalstate",state);
const [isStdLogged,setIsStdLogged]=state.studentAPI.isStdLogged
const [isStudent,setIsStudent]=state.studentAPI.isStudent

function LoggedRouter(){
  return<div>
   <div className="stdbackground">
    <div className="stdbanner">
    <h1 className="stdtwo">SMART DESK
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
  <div className='stddiv'>

 
<div className="boxForStd">
  <div className='firstRow'>

  
  <div><button className='ButtonStd'>Profile</button></div>
  <div><button className='ButtonStd'>Timetable</button></div>
  <div><button className='ButtonStd'>Marks</button></div>
  </div>
  <div className='secondRow'>
  <div><button  className='ButtonStd'>Teachers </button></div>
  <div><button  className='ButtonStd'>Store </button></div>
  <div><button  className='ButtonStd'>Fee Payment </button></div>

  </div>
</div>
</div>     
</div>
  </div>
</div> 
}
return(
  <>
 
  {
    isStudent&&isStdLogged ? LoggedRouter():NotFound()
  }
  </>
)
 
}

export default StudentHome
