const axios = require("axios")
axios.defaults.withCredentials = true
class jobDataService {
  async getAll() {
    return await axios.get("http://localhost:3001/api/jobs")
  }
  getById(id) {
    return axios.get(`http://localhost:3001/api/jobs/${id}`)
  }
  createJob(data) {
    return axios.post(
      "http://localhost:3001/api/jobs/",
      data
    )
  }
  updateJob(data, id) {
    return axios.put(
      `http://localhost:3001/api/jobs/${id}`,
      data
    )
  }
  deleteJob(id) {
    return axios.delete(
      `http://localhost:3001/api/jobs/${id}`
    )
  }
}
export default new jobDataService()
