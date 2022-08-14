import axios from "axios"

const getLoginUser = async () => {
  return await axios
    .get("http://localhost:3001/auth/login/success")
    .then((res) => {
      if (res.status === 200) {
        return res.data.user
      }
      throw new Error("authentication has been failed!")
    })
    .catch((err) => console.log(err))
}
const logout = async () => {
  axios.get("http://localhost:3001/auth/logout")
}

const authService = {
  getLoginUser,
  logout
}

export default authService
