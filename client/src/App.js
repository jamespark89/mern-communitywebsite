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

function App() {
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
        <Route path="/Login" exact element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
