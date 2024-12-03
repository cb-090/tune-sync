import { SignIn, SignOut } from "./Auth"

export default function Header( {user, editProfile, setHome} ) {
    return <header>
        {user ? <div className="navButtons">
            <button onClick={setHome}><img src="/tune-sync-home-icon.png" /></button>
            <button className="profileButton" onClick={editProfile}>Customize Profile</button> 
        </div> :
        <button onClick={setHome}><img src="/tune-sync-home-icon.png" /></button>}
        <h1>Tune Sync</h1>
        {!user ? <SignIn /> : <SignOut />}
    </header>
    
}