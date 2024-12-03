import { useEffect, useState } from 'react'
import { useAuthentication, loggedInUserDisplayName, loggedInUserProfilePhoto, loggedInUserId } from '../services/authService.js'
import { addUser, fetchUsers } from "../services/databaseService.js"
import Header from './Header.jsx'
import Users from './Users.jsx'
import Feed from './Feed.jsx'
import Profile from './Profile.jsx'

import '../App.css'

export default function App() {

  const [editing, setEditing] = useState(false)
  const [browsing, setBrowsing] = useState(false)
  const [data, setData] = useState({})
  const [query, setQuery] = useState("")
  const [queryType, setQueryType] = useState("")
  const [profile, setProfile] = useState(null)
  const [userList, setUserList] = useState([])
  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

  const user = useAuthentication()

  function setHome() {
    setEditing(false)
    setBrowsing(false)
    setProfile(null)
  }

  function switchProfileTo(profile) {
    setBrowsing(true)
    setEditing(false)
    setProfile(profile)
  }
  
  function editProfile() {
    setEditing(true)
    setBrowsing(false)
  }

  useEffect(() => {
    if (user) {
      console.log("signing in")
      addUser(loggedInUserId(), loggedInUserDisplayName(), loggedInUserProfilePhoto()).then(setProfile)
      fetchUsers().then(setUserList)
    }
    else {
      console.log("signing out")
      setProfile(null)
      setHome()
    }
  }, [user])

  useEffect(() => {
    setSongs()
    setArtists()
    setAlbums()
  }, [profile])

  useEffect(() => {
    if (query && queryType) {
      const encodedQuery = encodeURIComponent(query.toLowerCase());
      var url = ""
      if (queryType == "song") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=song&limit=25`;
        }
      else if (queryType == "artist") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=musicArtist&limit=25`;
        }
      else if (queryType == "album") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=album&limit=25`;
        }
      fetch(url)
        .then((r) => r.json())
        .then((r) => setData(r))
        .catch((e) => setData(`${e}`));
      }}, [query, queryType]);

  return (
    <div className="App">
      <Header user={user} editProfile={editProfile} setHome={setHome} />
      <Users switchProfileTo={switchProfileTo} users={userList}/>
      {editing && profile ?
      <Profile user={profile} data={data} search={setQuery} changeQuery={setQueryType} /> :
      browsing && profile ? <Feed user={profile} /> :
      <Feed />}
    </div>
  )
}
