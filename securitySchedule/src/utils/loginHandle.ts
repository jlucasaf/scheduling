import axios from "axios";
import { server } from "@/constants/server";
import { encript } from "./encript";

import AsyncStorage from '@react-native-async-storage/async-storage';



export async function loginHandle(username: string, password: string) {

    try{
        const encryptedPassword = encript(password);

        const response = await axios.post(`${server.host}${server.port}/login`, {
          username,
          password: encryptedPassword,
        });
      
        if (response.data.success) {
          return true;
        } else {
          return false;
        }
    }
    catch(err){
        console.error('Erro ao encriptar:', err);
    }

}
