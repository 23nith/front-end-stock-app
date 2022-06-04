import React, { useState } from 'react'

function SignUp({setShowLogin, setShowSignUp}) {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const handleOnChange = (e) => {
    switch(e.target.id){
      case "firstName":
          setFirstName(e.target.value);
          break;
      case "lastName":
          setLastName(e.target.value);
          break;
      case "email":
          setEmail(e.target.value);
          break;
      case "password":
          setPassword(e.target.value);
          break;
      case "confirmPassword":
          setConfirmPassword(e.target.value);
          break;
    }
  }

  const handleSubmit = (e) => {
    console.log("User Input: ", {firstName, lastName, email, password, confirmPassword})

    setShowLogin(true)
    setShowSignUp(false)

    fetch("http://localhost:3000/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName
          },
        }),
      })
      .then((res) => {
        if (res.ok) {
          console.log(res.headers.get("Authorization"));
          localStorage.setItem("token", res.headers.get("Authorization"));
          if (res.headers.get("Authorization") != null){
            setShowLogin(false)
          }
          return res.json();
        } else {
          throw new Error(res);
        }
      })
  }

  const handleBack = (e) => {
    setShowLogin(true)
    setShowSignUp(false)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center border-slate-800 border-2">
      <div>
        <form onSubmit={handleSubmit}>
          <input placeholder='First Name' type="text" required onChange={handleOnChange} id="firstName"  
            className='rounded-md border-slate-800 border-2 m-2 p-1 w-64'
          />
          <br/>
          <input placeholder='Last Name' type="text" required onChange={handleOnChange} id="lastName"  
            className='rounded-md border-slate-800 border-2 m-2 p-1 w-64'
          />
          <br/>
          <input placeholder='Email' type="email" required onChange={handleOnChange} id="email"  
            className='rounded-md border-slate-800 border-2 m-2 p-1 w-64'
          />
          <br/>
          <input placeholder='Password' type="password" required onChange={handleOnChange} id="password"  
            className='rounded-md border-slate-800 border-2 m-2 p-1 w-64'
          />
          <br/>
          <input placeholder='Confirm Password' type="password" required onChange={handleOnChange} id="confirmPassword"         
            className='rounded-md border-slate-800 border-2 m-2 p-1 w-64'
          />
          <br/>
          <input placeholder='rounded' className='rounded bg-slate-700 w-24 p-1 text-white m-2' type="submit" value="Submit" />
          <button className='rounded bg-slate-400 w-24 p-1 text-white m-2' onClick={handleBack}>Back</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp