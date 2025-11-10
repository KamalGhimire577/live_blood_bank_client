

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
  bloodrequests: [],
  status:Status.LOADING
}
const bloodrequestSlice = createSlice({
  name: "bloodrequest",
  initialState,
  reducers: {
    setBloodRequest: (state, action: PayloadAction<IBloodRequestData>) => {
      state.bloodrequest = action.payload;
    },
    setBloodRequests: (state, action: PayloadAction<IBloodRequestData[]>) => {
      state.bloodrequests = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    }
  },
});

const { setBloodRequest, setBloodRequests, setStatus } = bloodrequestSlice.actions;
export default bloodrequestSlice.reducer

export function addBloodRequest(data:IBloodRequestData){
  return async function addBloodRequestThunk(dispatch:AppDispatch){
    try{
      dispatch(setStatus(Status.LOADING))
      const response = await API.post("bloodrequest/add",data)
      if(response.status===201){
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

export function fetchBloodRequestsByRequesterId(requesterId: string){
  return async function fetchByRequesterThunk(dispatch:AppDispatch){
    try{
      dispatch(setStatus(Status.LOADING))
      const response = await API.get(`bloodrequest/requester/${requesterId}`)
      if(response.status===200){
        dispatch(setBloodRequests(response.data))
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

export function fetchBloodRequestsByDonorId(donorId: string){
  return async function fetchByDonorThunk(dispatch:AppDispatch){
    try{
      dispatch(setStatus(Status.LOADING))
      const response = await API.get(`bloodrequest/donor/${donorId}`)
      if(response.status===200){
        dispatch(setBloodRequests(response.data))
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

export function deleteBloodRequestByRequester(requestId: string){
  return async function deleteByRequesterThunk(dispatch:AppDispatch){
    try{
      dispatch(setStatus(Status.LOADING))
      const response = await API.delete(`bloodrequest/${requestId}`)
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

export function updateRequestStatusByDonor(requestId: string, status: string){
  return async function updateStatusThunk(dispatch:AppDispatch){
    try{
      dispatch(setStatus(Status.LOADING))
      const response = await API.patch(`bloodrequest/${requestId}/status`, { status })
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