import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
        <Routes path='/'>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
        </Routes>
    </Router>
  );
}

export default App;
