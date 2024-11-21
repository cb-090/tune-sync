import { SignIn, SignOut } from "./Auth"

export default function Header( {user, action} ) {
    return <header>
        {user ? <button id="profileButton" onClick={action}>Profile</button> :
        <div></div>}
        <h1>Tune Sync</h1>
        {!user ? <SignIn /> : <SignOut />}
    </header>
    
}