import { Status } from "@/lib/types/type"

export interface IUserData{
  phoneNumber:string,
  password:string
}




export interface IInitiallState{
  user:IUserData,
  status:Status

}

export interface IRegisterData extends IUserData{
  userName:string,
  email:string,
  
}