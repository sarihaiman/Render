import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { getfeedback } from '../../api/feedback.api';
import { Dialog, IconButton, DialogTitle, Typography, Button } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';

const FeedbackChart = () => {
    const [data, setData] = useState([
        { id: 0, value: 0, label: 'Excellent' },
        { id: 1, value: 0, label: 'Good' },
        { id: 2, value: 0, label: 'Fair' },
        { id: 3, value: 0, label: 'Poor' },
        { id: 4, value: 0, label: 'Very Poor' },
    ]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getfeedback();
                const responseData = response.data;
                const updatedData = [...data]; // Create a copy of the data array

                responseData.forEach((element: { name: any; }) => {
                    switch (element.name) {
                        case 'Excellent':
                            updatedData[0].value += 1;
                            break;
                        case 'Good':
                            updatedData[1].value += 1;
                            break;
                        case 'Fair':
                            updatedData[2].value += 1;
                            break;
                        case 'Poor':
                            updatedData[3].value += 1;
                            break;
                        case 'Very Poor':
                            updatedData[4].value += 1;
                            break;
                        default:
                            break;
                    }
                });

                setData(updatedData); // Update the state with the modified data
            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchData();
    }, []);

    const openFullScreen = () => {
        setIsFullScreen(true);
    };

    const closeFullScreen = () => {
        setIsFullScreen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', width: '550px', padding: '20px', border: '2px solid #ccc', borderRadius: '10px', margin: 'auto', marginTop: '11vh', marginBottom: '11vh' }}>
                <div style={{ position: 'relative' }}>
                    <IconButton
                        onClick={openFullScreen}
                        aria-label="full screen"
                    >
                        <Fullscreen />
                    </IconButton>
                    <PieChart
                        series={[
                            {
                                data,
                            },
                        ]}
                        width={400}
                        height={200}
                    />
                </div>
                <Dialog
                    fullScreen
                    open={isFullScreen}
                    onClose={closeFullScreen}
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') {
                            closeFullScreen();
                        }
                    }}
                >
                    <Typography style={{ textAlign: 'center' }} variant="h4">Press ESC to exit full screen</Typography>
                    <PieChart
                        series={[
                            {
                                data,
                            },
                        ]}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                </Dialog>
            </div>
        </>
    );
};

export default FeedbackChart;
