import { useState, useEffect, ChangeEvent } from 'react';
import { Button, TextField, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close, Edit, Delete, Save, Add } from '@mui/icons-material';
import { deleteUser, editUser, getAllUsers, SignUp } from '../../api/user.api';
import { User } from '../../interface/user.interface';
import { validateName, validatePrice, validatePhone, validatePassword, validateEmail } from '../../utils/validation'
import Swal from 'sweetalert2';

const CustomersAll = () => {
    const [AllCustomers, setAllCustomers] = useState<User[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const fetchAllCustomers = async () => {
            try {
                const response = await getAllUsers();
                console.log(response);
                setAllCustomers(response as User[]);
            } catch (error) {
                console.error('Error fetching All customers:', error);
            }
        };

        fetchAllCustomers();
    }, []);

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleCancelEdit = () => {
        if (editingIndex !== null) {
            // Get the original values from AllCustomers based on the editingIndex
            const originalValues = AllCustomers[editingIndex];

            // Reset the input fields to the original values
            setName(originalValues.name);
            setEmail(originalValues.email);
            setPhone(originalValues.phone);
            setPassword(originalValues.password);
        }

        setEditingIndex(null);
        setIsDialogOpen(false); // Close the dialog when canceling the edit
    };


    const handleSave = async (editedPackage: User) => {
        const nameValidationResult: string = validateName(editedPackage.name);
        if (nameValidationResult) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Name value.',
            });
            return;
        }
        const emailValidationResult: string = validateEmail(editedPackage.email);
        if (emailValidationResult) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Email value.',
            });
            return;
        }
        const phoneValidationResult: string = validatePhone(editedPackage.phone);
        if (phoneValidationResult) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Phone value.',
            });
            return;
        }
        try {
            await editUser(editedPackage);
            setAllCustomers(prevPackages =>
                prevPackages.map((pkg, index) => (index === editingIndex ? editedPackage : pkg))
            );
            setEditingIndex(null);
        } catch (error:any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
        }
    };

    const handleDelete = async (index: number) => {
        try {
            await deleteUser(AllCustomers[index].id); // Assuming there is an 'id' property in Customers
            setAllCustomers(prevPackages =>
                prevPackages.filter((_, i) => i !== index)
            );
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setAllCustomers(prevPackages =>
            prevPackages.map((pkg, i) => (i === index ? { ...pkg, [name]: value } : pkg))
        );
    };

    const handleAdd = async () => {
        if (name && email && phone && password) {
            try {
                const u: User = {
                    id: 0,
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    isAdmin: false
                };
                const nameValidationResult: string = validateName(name);
                if (nameValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Name value.',
                    });
                    return;
                }
                const emailValidationResult: string = validateEmail(email);
                if (emailValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Email value.',
                    });
                    return;
                }
                const passwordValidationResult: string = validatePassword(password);
                if (passwordValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Password value.',
                    });
                    return;
                }
                const phoneValidationResult: string = validatePhone(phone);
                if (phoneValidationResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Phone value.',
                    });
                    return;
                }
                const response = await SignUp(u);
                if (response === 'sign up 0 secceeded') {
                    setAllCustomers([...AllCustomers, u]);
                    setName('');
                    setEmail('');
                    setPhone('')
                    setPassword('')
                    setIsDialogOpen(false);
                } else {
                    console.error('Error adding new user: Response status is not 200');
                }
            } catch (error: any) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data,
                });
                console.error('Error logging in:', error);
            }
        }
        else
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Not completing values ​​in all fields.',
            });
    }

    const setIsDialogOpenToAdd = async () => {
        setName('');
        setEmail('');
        setPhone('')
        setPassword('')
        setIsDialogOpen(false)
    }

    return (
        <div>
            <Button onClick={() => setIsDialogOpen(true)} startIcon={<Add />} style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '40px' }}>Add New User</Button>
            <Dialog open={isDialogOpen} onClose={setIsDialogOpenToAdd} style={{ position: 'absolute', zIndex: 1 }}>
                <DialogTitle style={{ marginTop: '20px' }}>
                    Add New User
                    <IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={() => setIsDialogOpen(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
                    <br />
                    <TextField
                        label="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <TextField
                        label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <TextField
                        label="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <TextField
                        label="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleAdd} variant="contained" color="primary" style={{ marginTop: '20px' }}>Add</Button>
                </DialogContent>
            </Dialog>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {AllCustomers === null ? (
                    <Typography>Loading...</Typography>
                ) : (
                    AllCustomers.map((photographyPackage, index) => (
                        <div key={index} style={{ width: '250px', height: '280px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {editingIndex === index ? (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', right: 0, marginTop: '-5px' }}>
                                        <IconButton onClick={() => handleSave(photographyPackage)}>
                                            <Save />
                                        </IconButton>
                                        <IconButton onClick={() => handleCancelEdit()}>
                                            <Close />
                                        </IconButton>
                                    </div>
                                    <br />
                                    <div style={{ background: '#fff', padding: '5px', borderRadius: '5px' }}>
                                        <TextField style={{ marginTop: '-20px' }}
                                            name="name"
                                            label="Name"
                                            value={photographyPackage.name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                        />
                                        <br /> <br />
                                        <TextField
                                            name="email"
                                            label="Email"
                                            value={photographyPackage.email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                        />
                                        <br /> <br />
                                        <TextField
                                            name="phone"
                                            label="Phone"
                                            value={photographyPackage.phone}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                        />
                                        <br />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <br /><br />
                                    <Typography variant="h6">Name: {photographyPackage.name}</Typography>
                                    <Typography variant="h6">Phone: {photographyPackage.phone}</Typography>
                                    <Typography variant="h6">Email: {photographyPackage.email}</Typography>
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <IconButton onClick={() => handleEdit(index)} style={{ marginRight: '10px' }}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(index)}>
                                            <Delete />
                                        </IconButton>
                                    </div>
                                </>
                            )}

                        </div>
                    ))
                )
                }
            </div>
        </div>
    );
};


export default CustomersAll;