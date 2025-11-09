import { axiosClient } from "@/lib/axios";

export type AddUserType = {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
};

export async function addUser(payload: Partial<AddUserType>) {
  const { data } = await axiosClient.post("/add-user", payload);
  return data;
}
