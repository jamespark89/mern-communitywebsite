import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"
import authService from "../services/auth"

const initialState = {
  user: null
}
export const getLoginUser = createAsyncThunk(
  "auth/getLoginUser",
  async () => {
    try {
      const loginUser = await authService.getLoginUser()
      return loginUser
    } catch (err) {
      return err
    }
  }
)
export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await authService.logout()
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.user = action.payload
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
