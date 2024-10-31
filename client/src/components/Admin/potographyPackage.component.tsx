import { useState, useEffect, ChangeEvent } from 'react';
import { Button, TextField, Typography, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close, Edit, Delete, Save, Add } from '@mui/icons-material';
import { getAllPotograpyName, editPotographyPackage, deletePotographyPackage, addPotographyPackage } from '../../api/PotographyPackage.api';
import { PotographyPackage } from '../../interface/PotographyPackage.interface';
import { validateName, validatePrice } from '../../utils/validation'
import Swal from 'sweetalert2';

const PotographyPackageAll = () => {
    const [photographyPackages, setPhotographyPackages] = useState<PotographyPackage[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newPackageType, setNewPackageType] = useState('');
    const [newPackageMoneyToHour, setNewPackageMoneyToHour] = useState('');

    useEffect(() => {
        const fetchPhotographyPackages = async () => {
            try {
                const response = await getAllPotograpyName();
                setPhotographyPackages(response as PotographyPackage[]);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching business details:', error);
                setIsLoading(false);
            }
        };
        fetchPhotographyPackages();
    }, []);

    const handleEdit = (index: number) => {
        setEditingIndex(index);
    };

    const handleSave = async (editedPackage: PotographyPackage) => {
        const errorName = validateName(editedPackage.type);
        if (errorName) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Package Type.',
            });
            return;
        }
        const errorHours = validatePrice(editedPackage.moneyToHour);
        if (errorHours) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid Money To Hour value.',
            });
            return;
        }
        try {
            await editPotographyPackage(editedPackage);
            setPhotographyPackages(prevPackages =>
                prevPackages.map((pkg, index) => (index === editingIndex ? editedPackage : pkg))
            );
            setEditingIndex(null);
        } catch (error) {
            console.error('Error updating business details:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        setPhotographyPackages(prevPackages =>
            prevPackages.map((pkg, i) => (i === index ? { ...pkg, [name]: value } : pkg))
        );
    };

    const handleDelete = async (index: number) => {
        try {
            await deletePotographyPackage(photographyPackages[index].id); // Assuming there is an 'id' property in PotographyPackage
            setPhotographyPackages(prevPackages =>
                prevPackages.filter((_, i) => i !== index)
            );
        } catch (error) {
            console.error('Error deleting package:', error);
        }
    };

    const handleAdd = async () => {
        if (newPackageType && newPackageMoneyToHour) {
            try {
                const p: PotographyPackage = {
                    id: 0,
                    type: newPackageType,
                    moneyToHour: Number(newPackageMoneyToHour)
                };
                const errorName = validateName(p.type);
                if (errorName) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Package Type.',
                    });
                    return;
                }
                const errorHours = validatePrice(p.moneyToHour);
                if (errorHours) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please enter a valid Money To Hour value.',
                    });
                    return;
                }
                const response = await addPotographyPackage(p);
                if (response.status === 200) {
                    const newPackage: PotographyPackage = response.data; // Extract data from the response
                    setPhotographyPackages([...photographyPackages, newPackage]);
                    setNewPackageType('');
                    setNewPackageMoneyToHour('');
                    setIsDialogOpen(false);
                } else {
                    console.error('Error adding new package: Response status is not 200');
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
    };

    return (
        <div>
            <Button onClick={() => setIsDialogOpen(true)} startIcon={<Add />} style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '40px' }}>Add New Package</Button>
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} style={{ position: 'absolute', zIndex: 1 }}>
                <DialogTitle style={{ marginTop: '20px' }}>
                    Add New Photography Package
                    <IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={() => setIsDialogOpen(false)}>
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
                    <br />
                    <TextField
                        label="Type"
                        value={newPackageType}
                        onChange={(e) => setNewPackageType(e.target.value)}
                        fullWidth
                    />
                    <br />
                    <TextField
                        type='number'
                        label="Money To Hour"
                        value={newPackageMoneyToHour}
                        onChange={(e) => setNewPackageMoneyToHour(e.target.value)}
                        fullWidth
                    />
                    <Button onClick={handleAdd} variant="contained" color="primary" style={{ marginTop: '20px' }}>Add</Button>
                </DialogContent>
            </Dialog>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    photographyPackages.map((photographyPackage, index) => (
                        <div key={index} style={{ width: '250px', height: '200px', margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {editingIndex === index ? (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', right: 0, marginTop: '-5px' }}>
                                        <IconButton onClick={() => handleSave(photographyPackage)}>
                                            <Save />
                                        </IconButton>
                                        <IconButton onClick={() => setEditingIndex(null)}>
                                            <Close />
                                        </IconButton>
                                    </div>
                                    <br />
                                    <div style={{ background: '#fff', padding: '5px', borderRadius: '5px' }}>
                                        <TextField style={{ marginTop: '-20px' }}
                                            name="type"
                                            label="Type"
                                            value={photographyPackage.type}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                        />
                                        <br /> <br />
                                        <TextField
                                            type='number'
                                            name="moneyToHour"
                                            label="Money To Hour"
                                            value={photographyPackage.moneyToHour.toString()}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
                                        />
                                        <br />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <br /><br />
                                    <Typography variant="h6">Type: {photographyPackage.type}</Typography>
                                    <Typography variant="h6">Money To Hour: {photographyPackage.moneyToHour ? photographyPackage.moneyToHour.toString() : 'N/A'}</Typography>
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
                )}
            </div>
        </div>
    );
};

export default PotographyPackageAll;
