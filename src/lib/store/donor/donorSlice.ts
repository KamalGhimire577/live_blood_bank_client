import { Status } from "@/lib/types/type";
import { IDonorData, IDonorInitialState } from "./donorSlice.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";




const initialState: IDonorInitialState = {
  donor: {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    bloodGroup: "",
    provience: "",
    district: "",
    city: "",
    dateofbirth: "",
    last_donation_date: null, // optional field
    next_eligible_date: null,
  },
  status: Status.LOADING,
};

const donorSlice = createSlice({
  name: "donor",
  initialState: initialState,
  reducers: {
    setDonor(state: IDonorInitialState, action: PayloadAction<IDonorData>) {
      state.donor =action.payload
    },
    setStatus(state: IDonorInitialState, action: PayloadAction<Status>) {
      state.status =action.payload
    },
  },
});
const{setDonor,setStatus} =donorSlice.actions
export default donorSlice.reducer

