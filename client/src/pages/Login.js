import GoogleButton from "react-google-button"

export default function Login() {
  const handleGoogleLogin = async () => {
    window.open(
      `${process.env.REACT_APP_SERVER_URL}/auth/google/login`,
      "_self"
    )
  }
  return (
    <div className="flex justify-center pt-20 h-screen">
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  )
}
