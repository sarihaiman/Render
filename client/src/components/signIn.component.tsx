import { useEffect, useState } from 'react';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { FillDataCurrentUser } from '../redux/userAction';
import { useDispatch } from 'react-redux';
import { User } from '../interface/user.interface';
import { jwtDecode } from 'jwt-decode';
import { editUserForgetPassword, getAllUsers, SignIn } from '../api/user.api';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { FormHelperText } from '@material-ui/core';
import { validatePassword, validateEmail } from '../utils/validation';

export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [resetCode, setResetCode] = useState('');
    const [AllCustomers, setAllCustomers] = useState<User[]>([]);
    const [showA, setShowA] = useState(false);
    const [codeThatTheClientWrite, setCodeThatTheClientWrite] = useState('');
    const { handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(true);
    const [showAuthPassword, setShowAuthPassword] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogError, setOpenDialogError] = useState(false);
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const dispatch = useDispatch();

    const onSubmit = () => {
        setOpenDialog(true);
    };

    const onClick = () => {
        if (pass1 == pass2)
            setOpenDialog(true);
        else
            setOpenDialogError(true);
    };

    const editedForgetPassword: User = {
        password: '',
        id: 0,
        name: '',
        email: '',
        phone: '',
        isAdmin: false
    }

    const handleCloseDialog = async () => {
        editedForgetPassword.password = pass1;
        editedForgetPassword.email = email;
        await editUserForgetPassword(editedForgetPassword);
        setOpenDialog(false);
        setShowA(!showA)
    };

    const handleCloseDialogError = () => {
        setOpenDialogError(false);
    };

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                const response = await getAllUsers();
                setAllCustomers(response as User[]);
            } catch (error) {
                console.error('Error fetching All customers:', error);
            }
        };
        fetchAllCustomers();
    }, []);

    const handleSigninForm = async () => {
        setEmailError('');
        setPasswordError('');
        const passwordValidationResult: string = validatePassword(password);
        const emailValidationResult: string = validateEmail(email);
        if (emailValidationResult) {
            setEmailError(emailValidationResult);
            return;
        }
        if (passwordValidationResult) {
            setPasswordError(passwordValidationResult);
            return;
        }
        try {
            const response: string = await SignIn({
                email: email,
                password: password
            });
            sessionStorage.setItem("token", response);
            const userDecode: any = jwtDecode(response);
            setEmail('');
            setPassword('');
            const user: User = {
                email: userDecode.email,
                password: '',
                phone: userDecode.phone,
                id: userDecode.id,
                name: userDecode.name,
                isAdmin: userDecode.isAdmin
            };
            dispatch(FillDataCurrentUser(user));
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = 'http://localhost:5173/home';
            console.log('SigninForm successful:', response);
        } catch (error: any) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.response.data,
                    });
            console.error('Error logging in:', error);
        }
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '400px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    let code: string
    const resetPassword = async () => {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            const userExists = AllCustomers.some((u: User) => u.email === email);
            if (!userExists) {
                Swal.fire({
                    text: 'Email Not Found- SignUp',
                    icon: 'error',
                    showCloseButton: true,
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Close',
                });
            } else {
                code = String(Math.floor(100000 + Math.random() * 900000)); // Generate a random code
                setResetCode(code);
                setShowModal(true);
                await axios.get(`http://localhost:3000/send-email`, {
                    headers: {
                        'Content-Type': 'application/json',
                        "reset": code,
                        "mail": email
                    }
                });
            }
        } else {
            Swal.fire({
                text: 'Invalid Email',
                icon: 'error',
                showCloseButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Close',
            });
        }
    };

    const handleSendCode = () => {
        if (resetCode === codeThatTheClientWrite) {
            setShowModal(false);
            setShowA(true);
        } else {
            setShowModal(false);
            Swal.fire({
                text: 'Incorrect Reset Code',
                icon: 'error',
                showCloseButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Close',
            });
            // setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        handleSendCode();
    };

    return (
        <div>
            {!showA && (
                <div style={containerStyle}>
                    <Typography variant="h4">Sign In</Typography>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError ? true : false}
                        helperText={emailError}
                        style={inputStyle}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError ? true : false}
                        helperText={passwordError}
                        style={inputStyle}
                    />
                    <Button variant="contained" onClick={handleSigninForm}>Signin</Button>
                    <div className="disabled">
                        <Typography variant="h6" className="forgot-password" onClick={resetPassword} style={{ cursor: 'pointer', marginTop: '25px' }}>Forgot Password?</Typography>
                        <Dialog open={showModal} onClose={closeModal}>
                            <DialogTitle variant="h4">Reset Password Modal</DialogTitle>
                            <DialogContent>
                                <Typography variant="h6">Enter Reset Code</Typography>
                                <input type="number" onChange={(e) => setCodeThatTheClientWrite(e.target.value)} />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={closeModal}>Send</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <Typography variant="body1" style={{ marginTop: '10px' }}>
                        Not registered yet?
                        <Button color="primary" component={Link} to="/signUp">Sign Up</Button>
                    </Typography>
                </div>
            )}
            {showA && <div className="reset-form" style={containerStyle} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4">Reset Password Title</Typography>
                <br></br>
                <div>
                    <TextField
                        label="Password"
                        style={inputStyle}
                        className="input-style"
                        type={showPassword ? 'password' : 'text'}
                        name="password"
                        onChange={(e) => setPass1(e.target.value)}
                    />
                    <Button onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '200px', marginTop: '-135px' }}>
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                    {errors.password && errors.password.type === 'required' && (
                        <FormHelperText>Error message for required field</FormHelperText>
                    )}
                </div>

                <div>
                    <TextField
                        label="Password Authentication"
                        style={inputStyle}
                        className="input-style"
                        type={showAuthPassword ? 'password' : 'text'}
                        name="passwordAuthentication"
                        onChange={(e) => setPass2(e.target.value)}
                    />
                    {errors.passwordAuthentication && errors.passwordAuthentication.type === 'required' && (
                        <FormHelperText>Error message for required field</FormHelperText>
                    )}
                    {errors.passwordAuthentication && errors.passwordAuthentication.type === 'validate' && (
                        <FormHelperText>Error message for password mismatch</FormHelperText>
                    )}
                    <Button disabled={Object.keys(errors).length > 0 || (watch('password') !== watch('passwordAuthentication'))} onClick={() => setShowAuthPassword(!showAuthPassword)} style={{ marginLeft: '200px', marginTop: '-135px' }}>
                        {showAuthPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </Button>
                </div>
                <Button variant="contained" onClick={onClick}>Save New Password</Button>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Password Changed Successfully!</DialogTitle>
                    <DialogContent>
                        <Typography>Your password has been updated successfully.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary" component={Link} to="/">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openDialogError} onClose={handleCloseDialogError}>
                    <DialogTitle>Error!</DialogTitle>
                    <DialogContent>
                        <Typography>The Passwords Not Match</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialogError} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>}
        </div>
    );
}