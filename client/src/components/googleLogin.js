import GoogleLogin from "react-google-login"

export default function LoginBtn() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const onSuccess = (res) => {
    console.log(
      "LOGIN SUCCESS! Current user:",
      res.profileObj
    )
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
