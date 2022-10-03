import { useState } from 'react'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CharacterDetail from './components/CharacterDetail'
import Characters from './components/Characters'
import Loading from './components/Loading'
import ProtectedRoutes from './components/ProtectedRoutes'
import UserInput from './components/UserInput'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<UserInput/>} />

        <Route element={<ProtectedRoutes/>} >
        <Route path='/characters' element={<Characters/>} />
        <Route path='/characters/:id' element={<CharacterDetail/>} />
        </Route>

      </Routes>
    </HashRouter>
  )
}

export default App
