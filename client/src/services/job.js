const axios = require("axios")
axios.defaults.withCredentials = true
class jobDataService {
  async getAll() {
    return await axios.get("http://localhost:3001/api/jobs")
  }
  async getById(id) {
    return await axios.get(
      `http://localhost:3001/api/jobs/${id}`
    )
  }
  async createJob(data) {
    return await axios.post(
      "http://localhost:3001/api/jobs/",
      data
    )
  }
  async updateJob(data, id) {
    return await axios.put(
      `http://localhost:3001/api/jobs/${id}`,
      data
    )
  }
  async deleteJob(id) {
    return await axios.delete(
      `http://localhost:3001/api/jobs/${id}`
    )
  }
}
export default new jobDataService()
