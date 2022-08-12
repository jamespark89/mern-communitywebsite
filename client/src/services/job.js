const axios = require("axios")
axios.defaults.withCredentials = true
class jobDataService {
  async getAll() {
    return await axios.get("http://localhost:3001/jobs")
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
