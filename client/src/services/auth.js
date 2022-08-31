import axios from "axios"

const getLoginUser = async () => {
  return await axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/auth/login/success`
    )
    .then((res) => {
      if (res.status === 200) {
        return res.data.user
      }
    })
    .catch(() => null)
}
const logout = async () => {
  axios.get(
    `${process.env.REACT_APP_SERVER_URL}/auth/logout`
  )
}

const authService = {
  getLoginUser,
  logout
}

export default authService
