import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom"
import Home from "./pages/Home"
import House from "./pages/House"
import Job from "./pages/job"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import JobDetail from "./pages/job/detail/_id"
import JobNew from "./pages/job/JobNew"
import JobEdit from "./pages/job/JobEdit"
import { useEffect, useState } from "react"

function App() {
  const [user, setUser] = useState(null)
  const getUser = () => {
    fetch("http://localhost:3001/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
        "Access-Control-Allow-Crendentials": true
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        throw new Error("authentication has been failed!")
      })
      .then((resObject) => setUser(resObject.user))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/house" exact element={<House />} />
        <Route path="/job" exact element={<Job />} />
        <Route
          path="/job/:id"
          exact
          element={<JobDetail />}
        />
        <Route path="/job/new" exact element={<JobNew />} />
        <Route
          path="/job/edit/:id"
          exact
          element={<JobEdit />}
        />
        <Route path="/login" exact element={<Login />} />
        <Route path="/login/error" exact>
          Error loging in. Please try again later!
        </Route>
      </Routes>
    </Router>
  )
}

export default App
