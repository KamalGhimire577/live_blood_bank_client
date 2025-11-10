import { Status } from "@/lib/types/type";

export interface IUserData {
  phoneNumber: string;
  password: string;
  userName?: string;
}

export interface IInitialState {
  user: IUserData;
  token: string | null;
  status: Status;
}

export interface IRegisterData extends IUserData {
  userName: string;
  email: string;
}
