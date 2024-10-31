import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getimage } from '../api/image.api';

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);

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
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index: React.SetStateAction<number>) => {
        setCurrentImageIndex(index);
    };

    const renderDots = () => {
        return images.map((_, index) => (
            <span
                key={index}
                style={{
                    width: '20px', 
                    height: '20px', 
                    cursor: 'pointer',
                    color: 'black', 
                    backgroundColor: index === currentImageIndex ? 'black' : 'transparent',
                    border: '2px solid black', 
                    borderRadius: '50%', 
                    display: 'inline-block', 
                    margin: '0 10px',
                }}
                onClick={() => handleDotClick(index)} 
            />
        ));
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            {images.map((image: any, index) => (
                <div key={index} style={{ display: index === currentImageIndex ? 'block' : 'none', position: 'relative' }}>
                    <img src={`http://localhost:3000/image/${image._id}`} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
                </div>
            ))}
            <div style={{ position: 'absolute', bottom: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>{renderDots()}</div>
        </div>
    );
};

export default Home;