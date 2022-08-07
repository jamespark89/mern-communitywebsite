const axios = require("axios")

class jobDataService {
  getAll() {
    return axios.get("http://localhost:3001/jobs")
  }
  getById(id) {
    return axios.get(`http://localhost:3001/jobs/${id}`)
  }
  createJob(data) {
    return axios.post(
      "http://localhost:3001/jobs/add",
      data
    )
  }
  updateJob(data, id) {
    return axios.post(
      `http://localhost:3001/jobs/update/${id}`,
      data
    )
  }
  deleteJob(id) {
    return axios.delete(`http://localhost:3001/jobs/${id}`)
  }
}
export default new jobDataService()
