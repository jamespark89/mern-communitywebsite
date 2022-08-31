const axios = require("axios")
axios.defaults.withCredentials = true
class jobDataService {
  async getAll() {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/jobs`
    )
  }
  async getById(id) {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/jobs/${id}`
    )
  }
  async createJob(data) {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/jobs/`,
      data
    )
  }
  async updateJob(data, id) {
    return await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/jobs/${id}`,
      data
    )
  }
  async deleteJob(id) {
    return await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/jobs/${id}`
    )
  }
}
export default new jobDataService()
