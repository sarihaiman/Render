import axios from 'axios';
import { domain } from '../Config';

export const addimage = async (img: any) => {
    // try {
    //     const response = await axios.post('${domain}/image', img, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     });
    //     return response.data;
    // } catch (error) {
    //     console.error('error in api request of users', error);
    //     throw error;
    // }
}

export const getimage = async () => {
    // try {
    //     const token = sessionStorage.getItem("token");
    //     const response = await axios.get(`${domain}/image`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "token": token
    //         }
    //     });
    //     return response;
    // } catch (error) {
    //     console.error('error in api request of users', error);
    //     throw error;
    // }
}

export const deleteimage = async (id: number) => {
    // try {
    //     const token = sessionStorage.getItem("token");
    //     const response = await axios.delete(`${domain}/image/${id}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "token": token
    //         }
    //     });
    //     return response;
    // } catch (error) {
    //     console.error('error in api request of users', error);
    //     throw error;
    // }
}

export const getByIdimage = async (id: number) => {
    // try {
    //     const token = sessionStorage.getItem("token");
    //     const response = await axios.get(`${domain}/image/${id}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "token": token
    //         }
    //     });
    //     return response;
    // } catch (error) {
    //     console.error('error in api request of users', error);
    //     throw error;
    // }
}