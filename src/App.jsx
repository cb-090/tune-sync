import { useState } from 'react'
import Header from './Header.jsx'
import Users from './Users.jsx'
import Feed from './Feed.jsx'
import './App.css'

export default function App() {

  return (
    <div className="App">
      <Header />
      <Users />
      <Feed />
    </div>
  )
}
