import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInitiallState, IRegisterData, IUserData } from "./authSlice.types"
import { Status } from "@/lib/types/type"
import { register } from "module"
import API from "@/lib/http/api"
import { AppDispatch } from "../store"

const initialState:IInitiallState = {
  user:
  {
    phoneNumber:"",
    password:""
  },
  status :Status.LOADING

  
}

  const authSlice =  createSlice({ 
  name:"auth",
  initialState:initialState,
  reducers:{
    setUser(state:IInitiallState,action:PayloadAction<IUserData>) {
      state.user =action.payload
    },
    setStatus(state:IInitiallState,action:PayloadAction<Status>){
      state.status = action.payload
    }

  }

 


  

})

const {setUser,setStatus} = authSlice.actions
export default authSlice.reducer

export function registerUser ( data:IRegisterData){

   return async function registerUserThunk (dispatch:AppDispatch){
        try{ 
          const response = await API.post("auth/signup",data)
          if(response.status===201){
            dispatch(setStatus(Status.SUCCESS))
          }else {
            dispatch (setStatus(Status.ERROR))
          }

        }catch(error){
          console.log(error)
          dispatch (setStatus(Status.ERROR))

        }
    
   }

}

export function loginUser (data:IUserData){
  
  return async function loginUserThunk(dispatch:AppDispatch) {
    try{
      const response = await API.post ("auth/signin",data);
      if(response.status===201){
            dispatch(setStatus(Status.SUCCESS))
          }else {
            dispatch(setStatus(Status.ERROR))
          }

        }catch(error){
          console.log(error)
          dispatch (setStatus(Status.ERROR))

        }
    }
    
  }
