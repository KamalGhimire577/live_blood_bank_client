

import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IInitialBloodData, IBloodRequestData } from "./bloodrequestSlice.types";
import { Status } from "@/lib/types/type";
import API from "@/lib/http/api";
import { AppDispatch } from "../store";


const initialState:IInitialBloodData={

  bloodrequest: {
    donor_id: "",
    requestor_id: "",
    requester_name: "",
    requester_phone: "",
    requester_address: "",
    urgent: false,
    blood_group: "",
    status: "",
  },
  status:Status.LOADING
}
const bloodrequestSlice = createSlice({
  name: "bloodrequest",
  initialState,
  reducers: {
    setBloodRequest: (state, action: PayloadAction<IBloodRequestData>) => {
      state.bloodrequest = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    }
  },
});

const { setBloodRequest, setStatus } = bloodrequestSlice.actions;
export default bloodrequestSlice.reducer

export function addBloodRequest(data:IBloodRequestData){
  return async function addBloodRequestThunk(dispatch:AppDispatch){
    try{
      const response = await API.post("bloodrequest/add",data)
      if(response.status===200){
        dispatch(setStatus(Status.SUCCESS))
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    }catch(error){
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}