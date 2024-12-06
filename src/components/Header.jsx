import { SignIn, SignOut } from "./Auth"

export default function Header( {user, edit, home} ) {
    return <header>
        {user ? <div className="options">
            <button onClick={home}><img src="/tune-sync-home-icon.png" /></button>
            <button className="profileButton" onClick={edit}>Customize Profile</button> 
        </div> :
        <button onClick={home}><img src="/tune-sync-home-icon.png" /></button>}
        <h1>Tune Sync</h1>
        {!user ? <SignIn /> : <SignOut />}
    </header>
    
}