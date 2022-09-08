import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom"
import Home from "pages/Home"
import House from "pages/house/index"
import Job from "pages/job"
import Login from "pages/Login"
import Navbar from "components/Navbar"
import JobShow from "pages/job/JobShow"
import JobNew from "pages/job/JobCreate"
import JobEdit from "pages/job/JobEdit"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getLoginUser } from "redux/authSlice"
import PrivateRoutes from "utils/PrivateRoutes"
import HouseShow from "pages/house/HouseShow"
import HouseCreate from "pages/house/HouseCreate"
import HouseEdit from "pages/house/HouseEdit"
import Footer from "components/Footer"
import Profile from "pages/Profile"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLoginUser())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/login" exact element={<Login />} />
        <Route path="/login/error" exact>
          Error loging in. Please try again later!
        </Route>

        <Route
          path="/Job?page=:page"
          exact
          element={<Job />}
        />
        <Route path="/job" exact element={<Job />} />
        <Route
          path="/job/:id"
          exact
          element={<JobShow />}
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/job/new"
            exact
            element={<JobNew />}
          />
          <Route
            path="/job/edit/:id"
            exact
            element={<JobEdit />}
          />
        </Route>

        <Route
          path="/house?page=:page"
          exact
          element={<House />}
        />
        <Route path="/house" exact element={<House />} />
        <Route
          path="/house/:id"
          exact
          element={<HouseShow />}
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/house/new"
            exact
            element={<HouseCreate />}
          />
        </Route>
        <Route
          path="/house/edit/:id"
          exact
          element={<HouseEdit />}
        />
        <Route
          path="/profile/:id"
          exact
          element={<Profile />}
        />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
