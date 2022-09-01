import GoogleButton from "react-google-button"

export default function Login() {
  const SERVER_URL = "http://localhost:4000"
  const handleGoogleLogin = async () => {
    window.open(`${SERVER_URL}/auth/google/login`, "_self")
  }
  return (
    <div className="flex justify-center pt-20 h-screen">
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  )
}
