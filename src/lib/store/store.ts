// collect all slices and store

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/lib/store/auth/authSlice";
import donorAuthSlice from "@/lib/store/donor/donorSlice";
import bloodrequestReducer from "@/lib/store/bloodrequest/bloodrequestSlice";
import userRequestsReducer from "@/lib/store/userRequests/userRequestsSlice";
import donorRequestsReducer from "@/lib/store/donorRequests/donorRequestsSlice";
import adminReducer from "@/lib/store/admin/adminSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    donorauth: donorAuthSlice,
    bloodrequest: bloodrequestReducer,
    userRequests: userRequestsReducer,
    donorRequests: donorRequestsReducer,
    admin: adminReducer,
  },
});

export default store;

// dispatch ko type --> paxi kaam lagxa hamilai
// dispatch(setName()) --> dispatch() : AppDispatch
export type AppDispatch = typeof store.dispatch; // useDispatch lai type dina chayenxa
export type RootState = ReturnType<typeof store.getState>; // useSelector lai type dina chayenxa

// react-redux -- package
// next - reduxToolkit

// differents hook provide garxa :useSelector (), useDispatch()
