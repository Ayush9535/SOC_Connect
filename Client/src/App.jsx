import React from 'react'
import {Routes , Route} from "react-router-dom"
import Login from './Pages/Login'
import SignUp from './Pages/Sign_Up'

const App = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
    </Routes>
  )
}

export default App
