import { useEffect, useState } from 'react'
import { useAuthentication } from '../services/authService.js'
import Header from './Header.jsx'
import Users from './Users.jsx'
import Feed from './Feed.jsx'
import Profile from './Profile.jsx'
import '../App.css'

export default function App() {

  const [songName, setSongName] = useState("")
  const [artistName, setArtistName] = useState("")
  const [albumName, setAlbumName] = useState("")
  const [editing, setEditing] = useState(false)

  const user = useAuthentication()

  return (
    <div className="App">
      <Header user={user} action={() => setEditing(true)} />
      <Users action={() => setEditing(false)}/>
      {editing ? <Profile /> :
      <Feed />}
    </div>
  )
}
