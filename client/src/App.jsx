import React from 'react'
import {BrowserRouter,Routes,Route}  from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'

import AccountDashboard from './pages/user/Accountdashboard'
import Games from './pages/Games'
import Favourites from './pages/user/Favourites'
import Popular from './pages/games/Popular'
import Casino from './pages/games/Casino'
import Others from './pages/games/Others'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>  
        <Route exact path="/login" element={<Login/>}/>  
        <Route exact path="/register" element={<Registration/>}/>  
        <Route exact path="/games/:name" element={<Games/>}/>  

        {/* ----------user-pgaes------------------- */}

        <Route exact path="/profile" element={<AccountDashboard/>}/>  
        <Route exact path="/popular" element={<Popular/>}/>  
        <Route exact path="/casino" element={<Casino/>}/>  
        <Route exact path="/others" element={<Others/>}/>  
        <Route exact path="/favourites" element={<Favourites/>}/> 


      </Routes> 
   </BrowserRouter>
  )
}

export default App
