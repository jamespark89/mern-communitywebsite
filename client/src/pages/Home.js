import { useSelector } from "react-redux"

export default function Home() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      Welcome!
      {user && user.username}
    </div>
  )
}
