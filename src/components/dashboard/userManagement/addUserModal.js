import React, { useEffect, useState } from 'react'

function AddUserModal({setShowAddUserModal, handleAddUser}) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  const stopBubbling = (e) => {
    e.stopPropagation()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleCreateUserClick = (e) => {
    e.preventDefault();
    handleAddUser({email, password, firstName, lastName})
    setShowAddUserModal(false)
  }
  
  return (
    <div className='border-orange-900 border-2 w-screen h-screen absolute top-0 left-0 flex justify-center items-center' 
      onClick={()=>{setShowAddUserModal(false)}}
    >
      
      <div className='w-6/12 h-3/6 bg-zinc-50 shadow-md shadow-black rounded-md justify-center items-center flex' onClick={stopBubbling}>
        <div className=''>
          <form onSubmit={(e)=>{handleSubmit()}}>
          <div className='justify-start flex flex-col items-start w-80'>
              <div className='w-full flex flex-row justify-between items-center'>
                <div>
                  <label htmlFor="email">Email: </label>
                </div>
                <div>
                  <input required type="text" name="email" id="" onChange={(e)=>{setEmail(e.target.value)}} value={email} className="m-2 rounded p-2 border-gray-800 border-2"/>
                </div>
              </div>

              <div className='w-full flex flex-row justify-between items-center'>
                <div>
                  <label htmlFor="firstname">First Name: </label>
                </div>
                <div>
                  <input required type="text" name="firstname" id="" onChange={(e)=>{setFirstName(e.target.value)}} value={firstName} className="m-2 rounded p-2 border-gray-800 border-2"/>
                </div>
              </div>

              <div className='w-full flex flex-row justify-between items-center'>
                <div>
                  <label htmlFor="lastname">Last Name: </label>
                </div>
                <div>
                  <input required type="text" name="lastname" id="" onChange={(e)=>{setLastName(e.target.value)}} value={lastName} className="m-2 rounded p-2 border-gray-800 border-2"/>
                </div>
              </div>

              <div className='w-full flex flex-row justify-between items-center'>
                <div>
                  <label htmlFor="password">Password: </label>
                </div>
                <div>
                  <input required type="password" name="password" id="" onChange={(e)=>{setPassword(e.target.value)}} value={password} className="m-2 rounded p-2 border-gray-800 border-2"/>
                </div>
              </div>

              <div className='w-full'>
                <button type="submit"
                  className='rounded bg-sky-500/100 w-24 p-1 text-white mt-3'
                  onClick={handleCreateUserClick}
                >Submit</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUserModal