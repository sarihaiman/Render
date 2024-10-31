import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import axios from 'axios';
import { getimage } from '../api/image.api';

const GalleryImage = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
});

const GalleryComponent: React.FC = () => {
    const [images, setImages] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getimage();
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, []);

    return (
        <>
            <Typography variant="h2" align="center" gutterBottom style={{ color: theme.palette.secondary.main }}>
                My Gallery
            </Typography>
            <br></br>
            <Grid container spacing={2}>
                {images.map((image: any, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <GalleryImage src={`http://localhost:3000/image/${image._id}`} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default GalleryComponent;