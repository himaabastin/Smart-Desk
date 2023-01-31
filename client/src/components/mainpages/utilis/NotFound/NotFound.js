import React from 'react'
import "./NotFound.css"
const NotFound = () => {
  return (
    <div className='position-relative' style={{
      minHeight :'calc(100vh-70px)',marginTop:"6rem"
    }}>
        <h1 className='position-absolute' style={{color:"#d6483e",top:"50%",left:'50%',transform:'translate(-50%,-50%)'}}>
        404 | Not Found

        </h1>
    </div>
  )
}

export default NotFound
