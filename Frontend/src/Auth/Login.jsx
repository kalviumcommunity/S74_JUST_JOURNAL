import React from 'react'

const Login = () => {
  return (
    <div>
      <div className="login">
        <label htmlFor="email">E-Mail</label>
        <br />
        <input type="email" className="email" />
        <br />
        <br />
        <label htmlFor="passwrd">Password</label>
        <br />
        <input type="password" className="passwrd" />
        <br />
        <br />
        <button>submit</button>
      </div>
    </div>
  )
}

export default Login
