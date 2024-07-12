import axios from "axios";
import { server } from "@/constants/server";
import { encript } from "./encript";

export async function createUserHandle(username: string, password: string) {
  const encryptedPassword = encript(password);

  const response = await axios.post(`${server.host}${server.port}/createUser`, {
    username,
    password: encryptedPassword,
  });

  if (response.data.success) {
    return true;
  } else {
    return false;
  }
}