import axios from 'axios';
import { feedback } from '../interface/feedback.interface';
const token = sessionStorage.getItem("token");

export const addfeedback = async (feedback: feedback) => {
    try {
        const response = await axios.post(`http://localhost:3000/feedback`, feedback, {
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

export const getfeedback = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/feedback`);
        return response;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}