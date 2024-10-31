import { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Typography, IconButton } from '@mui/material';
import { Close, Save, Edit } from '@mui/icons-material';
import { getBusinessDetaild, editBusinessDetaild } from '../../api/business_details.api';
import { businessDetails } from '../../interface/businessDetails.interface';
import Swal from 'sweetalert2';
import { validateName, validatePhone, validateAddress } from '../../utils/validation'

const BusinessDetails = () => {
    const [businessDetails, setBusinessDetails] = useState<businessDetails | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedDetails, setEditedDetails] = useState<businessDetails | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const response = await getBusinessDetaild();
                setBusinessDetails(response as businessDetails);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching business details:', error);
                setIsLoading(false);
            }
        };
        fetchBusinessDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedDetails(businessDetails!);
    };

    const handleSave = async () => {
        const errorName = validateName(editedDetails!.name);
        if (errorName) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Business Name.',
            });
            return;
        }
        const errorAddress = validateAddress(editedDetails!.adress);
        if (errorAddress) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Business Address.',
            });
            return
        }
        const errorPhone = validatePhone(editedDetails!.phone);
        if (errorPhone) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Business Phone.',
            });
            return
        }
        try {
            if (editedDetails) {
                await editBusinessDetaild(editedDetails);
                setBusinessDetails(editedDetails);
                setIsEditing(false);
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response.data,
            });
            console.error('Error logging in:', error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedDetails(null); // Clear edited details
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (editedDetails) {
            const { name, value } = e.target;
            setEditedDetails({ ...editedDetails, [name]: value });
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    {isEditing ? (
                        <>
                            {editedDetails && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', right: 0, marginTop: '-5px' }}>
                                        <IconButton onClick={handleSave}>
                                            <Save />
                                        </IconButton>
                                        <IconButton onClick={handleCancelEdit}>
                                            <Close />
                                        </IconButton>
                                    </div>
                                    <br />
                                    <Typography variant="h4">Edit business Details</Typography>
                                    <br />
                                    <TextField
                                        name="name"
                                        label="Business Name"
                                        value={editedDetails.name}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <TextField
                                        name="adress"
                                        label="Business Address"
                                        value={editedDetails.adress}
                                        onChange={handleChange}
                                    />
                                    <br />
                                    <TextField
                                        name="phone"
                                        label="Business Phone"
                                        value={editedDetails.phone}
                                        onChange={handleChange}
                                    />
                                    <br />
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            <br />
                            <Typography variant="h4">Business Details</Typography>
                            {businessDetails && (
                                <>
                                    <Typography variant="h6">Name: {businessDetails.name}</Typography>
                                    <Typography variant="h6">Address: {businessDetails.adress}</Typography>
                                    <Typography variant="h6">Phone: {businessDetails.phone}</Typography>
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <IconButton onClick={handleEdit} style={{ marginRight: '10px' }}>
                                            <Edit />
                                        </IconButton>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default BusinessDetails;
