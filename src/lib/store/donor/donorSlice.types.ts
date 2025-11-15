import { Status } from "@/lib/types/type";

export interface IDonorData {
  username: string,
  password: string,
  email: string,
  phoneNumber: string,
  bloodGroup: string,
  province: string,
  district: string,
  city: string,
  dateofbirth: string |Date,
  last_donation_date?: string | null, // optional field
  next_eligible_date?: string | null, // optional field
}

export interface IDonorInitialState{
  donor:IDonorData,
  status:Status}
