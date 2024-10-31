import React, { useState, useEffect } from 'react';
import a from '../assets/logo.jpg';
import b from '../assets/logo.jpg';
import c from '../assets/logo.jpg';
import d from '../assets/logo.jpg';

const Home = () => {
    const imagePaths = [a, b, c, d];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [imagePaths.length]);

    const handleDotClick = (index: React.SetStateAction<number>) => {
        setCurrentImageIndex(index);
    };

    const renderDots = () => {
        return imagePaths.map((_, index) => (
            <span
                key={index}
                style={{
                    width: '20px', // Fixed width for the circular dot
                    height: '20px', // Fixed height for the circular dot
                    cursor: 'pointer',
                    color: 'black', // Set color to black for all dots
                    backgroundColor: index === currentImageIndex ? 'black' : 'transparent', // Fill dot with black if active
                    border: '2px solid black', // Add black border
                    borderRadius: '50%', // Make the dots circular
                    display: 'inline-block', // Display dots in a row
                    margin: '0 10px', // Equal spacing to the right and left
                }}
                onClick={() => handleDotClick(index)} // Handle click event to update current image index
            />
        ));
    };

    return (
        <div style={{ position: 'relative', textAlign: 'center' }}>
            {imagePaths.map((imagePath, index) => (
                <div key={index} style={{ display: index === currentImageIndex ? 'block' : 'none', position: 'relative' }}>
                    <img src={imagePath} alt={`Image ${index + 1}`} style={{ width: '100%' }} />
                </div>
            ))}
            <div style={{ position: 'absolute', bottom: '40px', width: '100%', display: 'flex', justifyContent: 'center' }}>{renderDots()}</div>
        </div>
    );
};

export default Home;