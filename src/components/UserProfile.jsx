export default function UserProfile( {profile, remove, songs, artists, albums} ) {

    return !profile || !songs || !artists || !albums ?
    <div className="error">
        <p>Our API is having trouble fetching your songs right now. Please wait before trying again.</p>
    </div>
    : <>
        <section className="userInfo">
            <img src={profile.userPhoto} alt="User's profile picture"></img>
            Hello, {profile.username}
        </section>
        <section className="userMusic">
            <ul className="userList">
                <h3>Songs</h3>
                {!songs ? "" :
                songs.map((song, index) => (
                    <li onClick={() => remove(song)} key={index}>
                        <p>{song.name}</p>
                        <p>🗑️</p>
                    </li>
                ))}
            </ul>
            <ul className="userList">
                <h3>Artists</h3>
                {!artists ? "" :
                artists.map((artist, index) => (
                    <li onClick={() => remove(artist)} key={index}>
                        <p>{artist.name}</p>
                        <p>🗑️</p>
                    </li>
                ))}
            </ul>
            <ul className="userList">
                <h3>Albums</h3>
                {!albums ? "" :
                albums.map((album, index) => (
                    <li onClick={() => remove(album)} key={index}>
                        <p>{album.name}</p>
                        <p>🗑️</p>
                    </li>
                ))}
            </ul>
         </section>
    </>;
}