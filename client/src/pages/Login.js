import GoogleButton from "react-google-button"

export default function Login() {
  const handleGoogleLogin = async () => {
    window
      .open(
        "http://localhost:3001/auth/google/login",
        "_self"
      )
      .then((res) => alert(res))
  }
  return (
    <div className="flex justify-center mt-20">
      <GoogleButton onClick={handleGoogleLogin} />
    </div>
  )
}
