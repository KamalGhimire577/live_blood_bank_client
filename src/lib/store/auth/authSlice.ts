import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IRegisterData, IUserData } from "./authSlice.types";
import { Status } from "@/lib/types/type";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";

const initialState: IInitialState = {
  user: {
    phoneNumber: "",
    password: "",
    userName: "",
  },
  token: null,
  status: Status.IDLE,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserData>) {
      state.user = action.payload;
    },
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },
    logout(state) {
      state.user = { phoneNumber: "", password: "", userName: "" };
      state.token = null;
      state.status = Status.IDLE;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setStatus, setToken, logout } = authSlice.actions;
export default authSlice.reducer;

// ✅ Registration Thunk
export function registerUser(data: IRegisterData) {
  return async function registerUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await API.post("auth/signup", data);

      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Signup error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// ✅ Login Thunk (Fixed typing)
export function loginUser(data: IUserData) {
  return async function loginUserThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));

      // 👇 Define expected response structure
      interface LoginResponse {
        token: string;
        userName: string;
        phoneNumber: string;
        password:"";
      }

      const response = await API.post<LoginResponse>("auth/signin", data);

      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data;

        dispatch(setUser(userData));
        dispatch(setToken(token));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
