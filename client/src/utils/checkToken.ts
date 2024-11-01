import {jwtDecode} from 'jwt-decode';

const isTokenValid = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
      if (decodedToken.exp! > currentTime) {
        return true;
      }
    }
    return false;
  }

export default isTokenValid;






