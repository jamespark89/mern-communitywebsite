import GoogleButton from "react-google-button"

export default function Login() {
  const handleGoogleLogin = async () => {
    window.open(
      "http://localhost:3001/auth/google/login",
      "_self"
    )
  }
  return (
    <div className="flex justify-center pt-20 h-screen">
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  )
}
