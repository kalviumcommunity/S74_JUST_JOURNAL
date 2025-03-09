import React from 'react'

const Signup = () => {
  return (
    <div>
      <div className="signup">
        <label htmlFor="email">E-Mail</label>
        <br />
        <input type="email" className="email" />
        <br />
        <br />
        <label htmlFor="username">Username</label>
        <br />
        <input type="text" className="username" />
        <br />
        <br />
        <label htmlFor="passwrd">Passoword</label>
        <br />
        <input type="password" className="passwrd" />
        <br />
        <br />
        <label htmlFor="Confirmation">Confirmation Password</label>
        <br />
        <input type="password" className="Confirmation" />
        <br />
        <br />
        <button>SUBMIT</button>

      </div>
    </div>
  )
}

export default Signup
