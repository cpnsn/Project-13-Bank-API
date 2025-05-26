import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import PrivateRoute from "./components/PrivateRoute";
import './App.css'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <User />
          </PrivateRoute>
        } 
      />
    </Routes>
    </>
  )
}
