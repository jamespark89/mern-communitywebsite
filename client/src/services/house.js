const axios = require("axios")
axios.defaults.withCredentials = true
class houseDataService {
  async getAllByPage(page, limit, userId) {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/houses?page=${page}&limit=${limit}&userId=${userId}`
    )
  }
  async getAllByUserId(id) {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/houses?userId=${id}`
    )
  }
  async getById(id) {
    return await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/houses/${id}`
    )
  }
  async createHouse(data) {
    return await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/houses/`,
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
      `${process.env.REACT_APP_SERVER_URL}/api/houses/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
  }
  async deleteHouse(id) {
    return await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/houses/${id}`
    )
  }
}
export default new houseDataService()
