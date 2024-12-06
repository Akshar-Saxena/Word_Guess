import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Game from './pages/Game'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route exact path='/start' element={<Game />} />
      </Routes>
    </Router>
  )
}
