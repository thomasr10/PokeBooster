import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from '../auth/ProtectedRoutes';
import HomePage from './pages/HomePage';
import Profil from './pages/Profil';

function App() {

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }>
        </Route>
        <Route path='/profil' element={
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        }>
        </Route>
      </Routes>
    </>
  )
}

export default App
