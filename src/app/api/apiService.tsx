import axios from 'axios';
import { IUser } from "@/types/IUser"; 

//GET-ручка для всех юзеров:
export const fetchGetUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users'); 
    return response.data; 
  } catch (error) {
    console.error(error);
    return [];   
  }
};

//GET-ручка для данных юзера по id:
export const fetchGetUserById = async (id: string): Promise<IUser | null> => {
    try {
      const response = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null; 
    }
  };

//PATCH-ручка для изменения данных юзера по id (фейковая):
export const patchUpdateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
  try {
    const response = await axios.patch<IUser>(`https://jsonplaceholder.typicode.com/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};