import LoginBtn from "../components/googleLogin"
import { useEffect } from "react"
import { gapi } from "gapi-script"

export default function Login() {
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: process.env.REACT_APP_CLIENT_ID,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  })
  return (
    <div className="flex justify-center mt-10">
      <LoginBtn />
    </div>
  )
}
