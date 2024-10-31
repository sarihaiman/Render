import axios from 'axios';
import { PotographyPackage } from '../interface/PotographyPackage.interface';

export const getAllPotograpyName = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/PhotographyPackage`)
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}

export const editPotographyPackage = async (PotographyPackage: PotographyPackage) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.put(`http://localhost:3000/PhotographyPackage/${PotographyPackage.id}`, PotographyPackage, {
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

export const deletePotographyPackage = async (PotographyPackageId: Number) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.delete(`http://localhost:3000/PhotographyPackage/${PotographyPackageId}`, {
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

export const addPotographyPackage = async (PotographyPackage: PotographyPackage) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(`http://localhost:3000/PhotographyPackage`, PotographyPackage, {
            headers: {
                'Content-Type': 'application/json',
                "token": token
            }
        });
        return response;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}