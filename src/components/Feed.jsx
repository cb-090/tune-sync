export default function Feed({ user }) {
    return <div className="feed">
        {!user ? "" :
        <h1>{user.username}'s Feed</h1>}
    </div>
}