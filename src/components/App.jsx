import { useEffect, useState } from 'react'
import { useAuthentication, loggedInUserDisplayName, loggedInUserProfilePhoto, loggedInUserId } from '../services/authService.js'
import { addUser, fetchUsers, addSong, addArtist, addAlbum, fetchSongs, fetchArtists, fetchAlbums } from "../services/databaseService.js"
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
  const [userProfile, setUserProfile] = useState(null)
  const [currentProfile, setCurrentProfile] = useState(null)
  const [userList, setUserList] = useState([])
  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

  const user = useAuthentication()

  async function save(result) {
    console.log("saving!")
    if (result.wrapperType == "track") {
        console.log(`Saved track ${result.trackId}`)
        addSong(result)
    }
    if (result.wrapperType == "artist") {
        console.log(`Saved artist ${result.artistId}`)
        addArtist(result)
    }
    if (result.wrapperType == "collection") {
        console.log(`Saved album ${result.collectionId}`)
        addAlbum(result)
    }
    setSongs(await fetchSongs(loggedInUserId()))
    setArtists(await fetchArtists(loggedInUserId()))
    setAlbums(await fetchAlbums(loggedInUserId()))
  }

  function setHome() {
    setEditing(false)
    setBrowsing(false)
  }

  function switchProfileTo(profile) {
    setBrowsing(true)
    setEditing(false)
    setCurrentProfile(profile)
  }
  
  function editProfile() {
    setEditing(true)
    setBrowsing(false)
  }

  useEffect(() => {
    async function logInUser() {
    if (user) {
      console.log("signing in")
      addUser(loggedInUserId(), loggedInUserDisplayName(), loggedInUserProfilePhoto()).then(setUserProfile)
      fetchUsers().then(setUserList)
      setSongs(await fetchSongs(loggedInUserId()))
      setArtists(await fetchArtists(loggedInUserId()))
      setAlbums(await fetchAlbums(loggedInUserId()))
    }
    else {
      console.log("signing out")
      setUserProfile(null)
      setHome()
    }
  }
  logInUser()
  }, [user])

  useEffect(() => {
    if (currentProfile) {
    async function fetchProfile() {
      setSongs(await fetchSongs(currentProfile.userId))
      setArtists(await fetchArtists(currentProfile.userId))
      setAlbums(await fetchAlbums(currentProfile.userId))
  }
  fetchProfile()
}
  }, [currentProfile])

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
      {editing && user ?
      <Profile user={userProfile} save={save} songs={songs} artists={artists} albums={albums} data={data} search={setQuery} changeQuery={setQueryType} /> :
      browsing && currentProfile ? <Feed user={currentProfile} songs={songs} artists={artists} albums={albums} /> :
      <Feed />}
    </div>
  )
}
