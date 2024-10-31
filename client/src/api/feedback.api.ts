import axios from 'axios';
import { feedback } from '../interface/feedback.interface';
const token = sessionStorage.getItem("token");
import { domain } from '../Config';

export const addfeedback = async (feedback: feedback) => {
    try {
        const response = await axios.post(`${domain}/feedback`, feedback, {
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
        const response = await axios.get(`${domain}/feedback`);
        return response;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}