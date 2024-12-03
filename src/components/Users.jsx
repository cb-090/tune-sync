export default function Users({switchProfileTo, users}) {
    return <nav>
        {!users ? "" :
        users.map((user) => (
            <li onClick = {() => switchProfileTo(user)} key={user.id}>
                <img src={user.userPhoto} alt={"User photo"} />
                {user.username}
            </li>
        ))}
    </nav>
}