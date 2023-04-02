import {BrowserRouter as Router, Routes, Route, Navigate, redirect} from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {

    const currentUser = useContext(UserContext)

    console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    
    const ProtectedRoute = ({children}) => {
        if (!currentUser) return <Navigate to='/login' />
        return children
    }

    const SecondProtectedRoute = ({children}) => {
        if (currentUser) return <Navigate to='/home' />
        return children
    }

  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<SecondProtectedRoute><Register /></SecondProtectedRoute>} />
            <Route path='/login' element={<SecondProtectedRoute><Login /></SecondProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        </Routes>
    </Router>
  );
}

export default App;
