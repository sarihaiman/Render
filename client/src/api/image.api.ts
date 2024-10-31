import axios from 'axios';

export const addimage = async (img: any) => {
    try {
        const response = await axios.post('http://localhost:3000/image', img, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('error in api request of users', error);
        throw error;
    }
}

export const getimage = async () => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/image`, {
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

export const deleteimage = async (id: number) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.delete(`http://localhost:3000/image/${id}`, {
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

export const getByIdimage = async (id: number) => {
    try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`http://localhost:3000/image/${id}`, {
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