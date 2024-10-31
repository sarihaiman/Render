import axios from 'axios';
import { domain } from '../Config';
import { SignInData, User } from "../interface/user.interface";

export const SignIn = async (data: SignInData) => {
  try {
    const response = await axios.post(`${domain}/signin`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const SignUp = async (data: User) => {
  try {
    const response = await axios.post(`${domain}/signup`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const getAllUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${domain}/User`, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const deleteUser = async (id: number) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${domain}/User/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const editUser = async (user: any) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(`${domain}/User/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
        "token": token
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}

export const editUserForgetPassword = async (user: any) => {
  try {
    const response = await axios.put(`${domain}/User/forgetPassword/${user.id}`, user, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('error in api request of users', error);
    throw error;
  }
}
