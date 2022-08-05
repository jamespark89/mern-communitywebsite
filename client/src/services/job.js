const axios = require("axios")

class jobDataService {
  getAll() {
    return axios.get("http://localhost:3001/jobs")
  }
  createJob(data) {
    return axios.post(
      "http://localhost:3001/jobs/add",
      data
    )
  }
}
export default new jobDataService()
