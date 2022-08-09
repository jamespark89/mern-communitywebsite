import axios from "axios"
import GoogleLogin from "react-google-login"

export default function LoginBtn() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const onSuccess = async (res) => {
    const id_token = await res.getAuthResponse().id_token
    axios
      .post("http://localhost:3001/auth", {
        id_token
      })
      .then((userinfo) => console.log(userinfo.data))
      .catch((err) => {
        console.log(err)
      })
  }
  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res)
  }
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText={"Login with Google"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  )
}
