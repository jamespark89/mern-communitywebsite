import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

function PrivateRoutes() {
  const { user, isLoading, isSuccess } = useSelector(
    (state) => state.auth
  )

  if (isLoading) return <span>Loading...</span>
  if (isSuccess && !user)
    return (
      <>
        <Navigate to={"/login"} />
      </>
    )
  return <Outlet />
}
export default PrivateRoutes
