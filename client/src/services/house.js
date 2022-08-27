const axios = require("axios")
axios.defaults.withCredentials = true
class houseDataService {
  async getAll() {
    return await axios.get(
      "http://localhost:3001/api/houses"
    )
  }
  async getById(id) {
    return await axios.get(
      `http://localhost:3001/api/houses/${id}`
    )
  }
  async createHouse(data) {
    return await axios.post(
      "http://localhost:3001/api/houses/",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }
  async updateHouse(data, id) {
    return await axios.put(
      `http://localhost:3001/api/houses/${id}`,
      data
    )
  }
  async deleteHouse(id) {
    return await axios.delete(
      `http://localhost:3001/api/houses/${id}`
    )
  }
}
export default new houseDataService()
