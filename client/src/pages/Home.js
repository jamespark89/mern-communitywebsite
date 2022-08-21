import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { reset } from "../redux/authSlice"

export default function Home() {
  const { user, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())
  }, [
    user,
    isError,
    isSuccess,
    message,
    navigate,
    dispatch
  ])
  if (isLoading) return <span>Loading...</span>
  return (
    <div>
      Welcome!
      {user && user.username}
    </div>
  )
}
