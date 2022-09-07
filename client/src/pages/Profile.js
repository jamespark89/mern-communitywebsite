import { useSelector } from "react-redux"

function Profile() {
  const { user } = useSelector((state) => state.auth)
  if (user)
    return (
      <div>
        <div>
          <h1>Profile</h1>
        </div>
        {user.username}
      </div>
    )
}

export default Profile
