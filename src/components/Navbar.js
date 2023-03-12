import React from 'react'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

    const handleSignOut = () => {
        try {
            signOut(auth)
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
      <div className="navbar">
        <h3>Username</h3>
        <img 
            src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="profile image" 
        />
        <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default Navbar