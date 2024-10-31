import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { SignUp } from '../api/user.api';
import { FillDataCurrentUser } from '../redux/userAction';
import { useDispatch } from 'react-redux';
import { User } from '../interface/user.interface';
import { Link } from 'react-router-dom';
import { validateName, validatePhone, validatePassword, validateEmail } from '../utils/validation';
import Swal from 'sweetalert2';

const inputStyle = {
    height: '40px',
    width: '100%',
};

export default function SignUpForm() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const handleSignUp = async () => {
        setEmailError('');
        setNameError('');
        setPasswordError('');
        setPhoneError('');
        const nameValidationResult: string = validateName(name);
        if (nameValidationResult) {
            setNameError(nameValidationResult);
            return;
        }

        const emailValidationResult: string = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            return;
        }

        const phoneValidationResult: string = validatePhone(phone);
        if (phoneValidationResult) {
            setPhoneError(phoneValidationResult);
            return;
        }

        const passwordValidationResult: string = validatePassword(password);
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            return;
        }
        try {
            const user: User = {
                email,
                password,
                phone,
                id: 0,
                name,
                isAdmin: false
            };
            const response = await SignUp(user);
            setEmail('');
            setName('');
            setPassword('');
            setPhone('');
            dispatch(FillDataCurrentUser(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            sessionStorage.setItem("token", response.data);
            window.location.href = 'http://localhost:5173/home';
            console.log('SignUp successful:', response.data);
        } catch (error: any) {
            if (error.response.data == "email exists")
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Email already exists. Please use a different email.',
                });
            else
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error',
                });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            <Typography variant="h4">Sign Up</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError ? true : false}
                helperText={nameError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError ? true : false}
                helperText={emailError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError ? true : false}
                helperText={passwordError}
                style={inputStyle}
            />
            <br /><br /><br />
            <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={phoneError ? true : false}
                helperText={phoneError}
                style={inputStyle}
            />
            <br /><br /><br />
            <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Already have an account?
                <Button color="primary" component={Link} to="/signIn">signIn</Button>
            </Typography>
        </div>
    );
}
