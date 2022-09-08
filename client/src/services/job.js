const axios = require("axios")
axios.defaults.withCredentials = true
class jobDataService {
  async getAllByPage(page, limit) {
    return await axios.get(
      `/api/jobs?page=${page}&limit=${limit}`
    )
  }
  async getAll() {
    return await axios.get(`/api/jobs`)
  }
  async getById(id) {
    return await axios.get(`/api/jobs/${id}`)
  }
  async createJob(data) {
    return await axios.post(`/api/jobs/`, data)
  }
  async updateJob(data, id) {
    return await axios.put(`/api/jobs/${id}`, data)
  }
  async deleteJob(id) {
    return await axios.delete(`/api/jobs/${id}`)
  }
}
export default new jobDataService()
