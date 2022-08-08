import { useEffect } from "react"
import { gapi } from "gapi-script"

export default function Home() {
  const clientId =
    "368195289795-7bqcfndrm1s9g63lhc6m0uh56mg3fb44.apps.googleusercontent.com"

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: clientId,
        scope: ""
      })
    }
    gapi.load("client:auth2", start)
  })
  return <div>Home</div>
}
