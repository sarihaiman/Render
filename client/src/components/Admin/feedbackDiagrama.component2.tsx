import React, { useState, useEffect } from 'react';
import { getfeedback } from '../../api/feedback.api';
import { BarChart } from '@mui/x-charts/BarChart';
import { Dialog, IconButton, DialogTitle, Typography } from '@mui/material';
import { Fullscreen } from '@mui/icons-material';

const FeedbackChart = () => {
    const [data, setData] = useState([0, 0, 0, 0, 0]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getfeedback();
                const responseData = response.data;
                const updatedData = [...data];

                responseData.forEach((element: { name: any; }) => {
                    switch (element.name) {
                        case 'Excellent':
                            updatedData[0] += 1;
                            break;
                        case 'Good':
                            updatedData[1] += 1;
                            break;
                        case 'Fair':
                            updatedData[2] += 1;
                            break;
                        case 'Poor':
                            updatedData[3] += 1;
                            break;
                        case 'Very Poor':
                            updatedData[4] += 1;
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
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data
                            },
                        ]}
                        width={500}
                        height={300}
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
                    <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'],
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data
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
