import { useState } from 'react';
import { Grid, Box } from '@material-ui/core';
import { WhatsApp, Phone, Email, Message, Chat } from '@material-ui/icons'; // Import the Chat icon
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import ChatComponent from '../components/ChatBot/chatbot.components';

const Contact = () => {
    const [openDialog, setOpenDialog] = useState(false);

    const [showChat, setShowChat] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleWhatsAppClick = () => {
        window.open('https://api.whatsapp.com/send?phone=0533197414', '_blank');
    };

    const handleEmailClick = () => {
        window.open('mailto:s97414h@gmail.com');
    };

    const handlePhoneClick = () => {
        window.open('tel:+533197414');
    };

    const handleDirectMessageClick = () => {
        // setShowMessageForm(true);
        setOpenDialog(true);
    };

    const handleChatClick = () => {
        setShowChat(true)
    };

    // const handleChatClick = () => {
    //     window.location.href = 'http://localhost:5173/chat';
    // };

    const handleCloseDialogError = () => {
        setOpenDialog(false);
    };

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        if (name === 'name' && !/^[א-ת\s]*$/.test(value)) {
            return;
        }

        if (name === 'phone' && !/^\d{8,}$/.test(value)) {
            return;
        }

        if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const inputStyle: React.CSSProperties = {
        height: '55px',
        width: '100%',
        marginBottom: '30px',
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '200px',
        padding: '20px',
        border: '2px solid #ccc',
        borderRadius: '10px',
        margin: 'auto',
        marginTop: '10vh',
        marginBottom: '10vh',
    };

    return (
        <div>
            <Box display="flex" justifyContent="center" style={{ padding: '20px', margin: '20px' }}>
                <Grid container spacing={10} justifyContent="center"> {/* Update 'justify' to 'justifyContent' */}
                    <Grid item><WhatsApp onClick={handleWhatsAppClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Email onClick={handleEmailClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Phone onClick={handlePhoneClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Message onClick={handleDirectMessageClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid>
                    <Grid item><Chat onClick={handleChatClick} style={{ cursor: 'pointer', fontSize: 50 }} /></Grid> {/* Add the Chat icon */}
                </Grid>
            </Box>
            <Dialog open={openDialog} onClose={handleCloseDialogError}>
                <DialogTitle>Massage</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        style={inputStyle}
                        fullWidth />
                    <TextField
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        fullWidth />
                    <TextField
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={inputStyle}
                        fullWidth />
                    <TextField
                        name="message"
                        label="Message"
                        multiline rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        style={inputStyle}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialogError} color="primary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
            {showChat && <ChatComponent />}
        </div>
    );
};

export default Contact;
