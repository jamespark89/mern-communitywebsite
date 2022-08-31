const axios = require("axios")
axios.defaults.withCredentials = true
class houseDataService {
  async getAll() {
    return await axios.get(`/api/houses`)
  }
  async getById(id) {
    return await axios.get(`/api/houses/${id}`)
  }
  async createHouse(data) {
    return await axios.post(`/api/houses/`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
  async updateHouse(data, id) {
    return await axios.put(`/houses/${id}`, data)
  }
  async deleteHouse(id) {
    return await axios.delete(`/api/houses/${id}`)
  }
}
export default new houseDataService()
