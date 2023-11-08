import React from 'react'
import './userprofile.css'
import Navbar from '../navbar/navbar'

const Userprofile = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <div className="userProfile">
      <div className="big-container">
        <form action="">
          <h2>Sign Up or Sign In</h2>
          <input type="email" placeholder='Email Address' />
          <input type="password" placeholder='Password' />
          <button>Continue</button>
          <p>By continuing, you agree to our User Agreement and Privacy Policy.</p>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Userprofile
