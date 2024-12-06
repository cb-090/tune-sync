export default function UserProfile( {profile, songs, artists, albums} ) {

    return !profile || !songs || !artists || !albums ?
    <div className="error">
        <p>Our API is having trouble fetching your songs right now. Please wait before trying again.</p>
    </div>
    : <>
        <section className="userInfo">
            <img src={profile.userPhoto} alt="User's profile picture"></img>
            Hello, {profile.username}
        </section>
        <section className="userLists">
            <ul className="songList">
                <h3>Songs</h3>
                {!songs ? "" :
                songs.map((song, index) => (
                    <li key={index}>{song.name}</li>
                ))}
            </ul>
            <ul className="artistList">
                <h3>Artists</h3>
                {!artists ? "" :
                artists.map((artist, index) => (
                    <li key={index}>{artist.name}</li>
                ))}
            </ul>
            <ul className="albumList">
                <h3>Albums</h3>
                {!albums ? "" :
                albums.map((album, index) => (
                    <li key={index}>{album.name}</li>
                ))}
            </ul>
         </section>
    </>;
}