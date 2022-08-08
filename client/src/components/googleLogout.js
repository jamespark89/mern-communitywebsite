import { GoogleLogout } from "react-google-login"

export default function LogoutBtn() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const onSuccess = (res) => {
    console.log("LOGOUT SUCCESS!")
  }
  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={CLIENT_ID}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}
