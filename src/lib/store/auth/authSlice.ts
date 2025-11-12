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
    // ✅ Set user
    setUser(state, action: PayloadAction<IUserData>) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // keep synced
    },

    // ✅ Set status
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    // ✅ Set token + persist/remove in localStorage
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    // ✅ Logout clears all
    logout(state) {
      state.user = { phoneNumber: "", password:"", userName: "" };
      state.token = null;
      state.status = Status.IDLE;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

// ✅ Login Thunk
export function loginUser(data: IUserData) {
  return async function loginUserThunk(dispatch: AppDispatch) {

    try {
      dispatch(setStatus(Status.LOADING));

      // Expected backend response
      interface LoginResponse {
        token: string;
        userName: string;
        phoneNumber: string;
        password?: string;
      }

      const response = await API.post<any>("auth/signin", data);
      console.log({ response });
      if (response.status === 200 && response.data) {
        const { token, ...userData } = response.data.data;

        // ✅ Store both in Redux & localStorage
        dispatch(setUser({ ...userData, password: userData.password || "" }));
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
export const initializeAuth = (dispatch: AppDispatch) => {
  if (typeof window === "undefined") return; // ✅ avoid SSR crash

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token) dispatch(setToken(token));
  if (user) dispatch(setUser(JSON.parse(user)));
};