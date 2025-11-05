import { axiosClient } from "@/lib/axios";

export type LoginPayloadType = {
  email: string;
  password: string;
};

export type AuthUserType = {
  email: string;
  password: string;
};

export type LoginResponseType = {
  accesToken: string;
  user: AuthUserType;
};

export async function loginUser(
  payload: LoginPayloadType
): Promise<LoginResponseType> {
  const { data } = await axiosClient.post<LoginResponseType>("/login", payload);
  return data;
}

const TOKEN_KEY = "access_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getSavedToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string | null) {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function logout() {
  clearToken();
  setAuthToken(null);
}
