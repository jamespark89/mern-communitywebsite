import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom"
import Home from "./routes/Home"
import House from "./routes/House"
import Job from "./routes/job"
import Login from "./routes/Login"
import Navbar from "./components/Navbar"
import JobDetail from "./routes/job/detail/_id"
import JobNew from "./routes/job/JobNew"
import JobEdit from "./routes/job/JobEdit"

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
