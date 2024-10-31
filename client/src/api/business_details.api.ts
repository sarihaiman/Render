import axios from 'axios';
import { businessDetails } from '../interface/businessDetails.interface';

export const getBusinessDetaild = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/business`);
        return response.data[0];
    } catch (error) {
        console.error('error in api request of businessDetails', error);
        throw error;
    }
}

export const editBusinessDetaild = async (businessDetaild: businessDetails) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.put("http://localhost:3000/business", businessDetaild, {
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