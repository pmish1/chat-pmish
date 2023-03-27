import React, { useContext } from 'react'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

function Navbar() {
    const navigate = useNavigate()

    const currentUser = useContext(UserContext)



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
        <h3>{currentUser.displayName}</h3>
        <img 
            src={currentUser.photoURL} 
            alt="profile image" 
        />
        <button onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default Navbar