import { login, logout } from "../services/authService"

export function SignIn() {
  return <button onClick={login}>Sign In</button>
}

export function SignOut() {
  return (
    <div className="SignOut">
      <button onClick={logout}>Sign Out</button>
    </div>
  )
}