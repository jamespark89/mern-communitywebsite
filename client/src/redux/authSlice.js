import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit"
import authService from "../services/auth"

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ""
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
    try {
      await authService.logout()
    } catch (err) {
      return err
    }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ""
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginUser.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        console.log("logout")
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
