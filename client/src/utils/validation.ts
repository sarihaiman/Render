import Swal from "sweetalert2";

export const validateEmail = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return 'Email should be format "example@example.com"';
    }
    return '';
};

export const validateName = (name: string) => {
    const nameRegex = /^[\u0590-\u05FFa-zA-Z\s&]{3,15}$/;
    if (!nameRegex.test(name)) {
        return 'Name should be between 3 and 15 characters long';
    }
    return '';
};

export const validatePhone = (phone: string) => {
    const phoneRegex =  /^(?:[0-9] ?-?){6,14}[0-9]$/;
    if (!phoneRegex.test(phone)) {
        return 'Phone number should be in the format 1234567890';
    }
    return '';
};


export const validatePrice = (price: number) => {
    if (price<1) {
        return 'Phone number should be in the format 1234567890';
    }
    return '';
};

export const validateAddress = (address: string) => {
    const addressRegex = /^[\u0590-\u05FFa-zA-Z0-9\s]{5,30}$/;
    if (!addressRegex.test(address)) {
        return 'address should be between 5 and 30 characters long';
    }
    return '';
};

export const validatePassword = (password: string) => {
    if (!password.match(/[A-Z]/)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (!password.match(/[0-9]/)) {
        return 'Password must contain at least one number';
    }
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    return '';
};

export const isFormValid = (packageName:any, date:any, beginingHour:any, endHour:any) => {
    if (!packageName || !date || !beginingHour || !endHour) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please fill in all fields',
        });
        return false;
    }
    return true;
};

export const isDateValid = (selectedDate:any) => {
    const currentDate = new Date();
    if (selectedDate < currentDate) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'Please select a future date',
        });
        return false;
    }
    return true;
};

export const isTimeValid = (startHour:any, endHour:any) => {
    const start = new Date(`01/01/2000 ${startHour}`);
    const end = new Date(`01/01/2000 ${endHour}`);
    const timeDiff = (end.getTime() - start.getTime()) / 1000;
    if (timeDiff < 1800) {
        Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: 'End hour should be at least 30 minutes after beginning hour',
        });
        return false;
    }
    return true;
};