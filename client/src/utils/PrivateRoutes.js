import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

function PrivateRoutes() {
  const { user, isLoading } = useSelector(
    (state) => state.auth
  )
  if (isLoading) return <span>Loading...</span>
  if (user) return <Outlet />
  return (
    <>
      <Navigate to={"/login"} />
    </>
  )
}
export default PrivateRoutes
