import {
  Routes,
  Route,
  BrowserRouter as Router
} from "react-router-dom"
import Home from "./routes/Home"
import House from "./routes/House"
import Job from "./routes/Job"
import Login from "./routes/Login"
import Navbar from "./components/Navbar"
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/house" exact element={<House />} />
        <Route path="/job" exact element={<Job />} />
        <Route path="/Login" exact element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
