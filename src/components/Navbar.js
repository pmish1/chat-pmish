import React, { useContext } from 'react'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import {FiLogOut} from 'react-icons/fi'
import {VscAccount} from 'react-icons/vsc'

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
        <div className="navbar__profile">
            {/* <VscAccount size="20px"/> */}
            <img 
                src={currentUser.photoURL} 
                alt="profile image" 
            />
            <h3>{currentUser.displayName}</h3>
        </div>
        <button onClick={handleSignOut}>
            Logout
            <FiLogOut size="16px"/>
        </button>
    </div>
  )
}

export default Navbar