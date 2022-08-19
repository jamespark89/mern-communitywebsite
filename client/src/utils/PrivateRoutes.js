import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"
function PrivateRoutes() {
  const { user } = useSelector((state) => state.auth)
  if (user) return <Outlet />
  else {
    return (
      <Navigate to={"/login"} />
      // <div>
      //   <span>"Please Login to use this page"</span>
      // </div>
    )
  }
}
export default PrivateRoutes
