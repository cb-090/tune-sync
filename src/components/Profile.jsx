import SearchBar from "./SearchBar"
import Results from "./Results"

export default function Profile( {user, save, songs, artists, albums, data, search, changeQuery} ) {

    return <div className="userProfile">
        <div className="userInfo">
            <img src={user.userPhoto} alt="User's profile picture"></img>
            Hello, {user.username}
        </div>
        <section className="favorites">
        <ul className="songList">
            <h2>Songs</h2>
             {!songs ? "" :
             songs.map((song, index) => (
                <li key={index}>{song.trackId}</li>
             ))}
         </ul>
        <ul className="artistList">
            <h2>Artists</h2>
            {!artists ? "" :
            artists.map((artist, index) => (
                <li key={index}>{artist.artistId}</li>
             ))}
         </ul>
         <ul className="albumList">
            <h2>Albums</h2>
            {!albums ? "" :
            albums.map((album, index) => (
                <li key={index}>{album.collectionId}</li>
             ))}
         </ul>
         </section>
         <div className="searchButtons">
         <button onClick={() => changeQuery("artist")}>Add Artist</button>
         <button onClick={() => changeQuery("song")}>Add Song</button>
         <button onClick={() => changeQuery("album")}>Add Album</button>
         </div>
         <SearchBar action={search} />
         <Results data={data} save={save}/>
    </div>;
}