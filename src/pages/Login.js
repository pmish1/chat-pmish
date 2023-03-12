import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {auth} from '../Firebase'

import './Login.css'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/home')
        } catch (error) {
            console.log(error)
        }

    }
  return (
    <div className='loginForm'>
    <form onSubmit={handleSubmit}>
        <h1>Chat App</h1>
        <input type="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>

        <button type='submit'>Login</button>
        
        <span>Don't have an account? <Link to='/register'>Register</Link></span>

    </form>

</div>
  )
}

export default Login