import {BrowserRouter as Router, Routes, Route, Navigate, redirect} from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {

    const currentUser = useContext(UserContext)
    
    const ProtectedRoute = ({children}) => {
        if (!currentUser) return <Navigate to='/login' />
        return children
    }

  return (
    <Router>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        </Routes>
    </Router>
  );
}

export default App;
