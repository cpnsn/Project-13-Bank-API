import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import './App.css'

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/sign-in.html' element={<Login/>} />
      <Route path='/user.html' element={<User/>} />
    </Routes>
    </>
  )
}
