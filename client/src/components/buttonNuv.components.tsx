import React, { useState, useEffect } from 'react';
import { getBusinessDetaild } from '../api/business_details.api';
import { businessDetails } from '../interface/businessDetails.interface';
import { Typography, Paper , useTheme} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    footerContainer: {
        padding: '20px',
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    detailItem: {
        fontSize: '1rem',
        marginBottom: '5px',
        color: 'black',
    },
});


const BusinessDetailsComponent : React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [businessDetails, setBusinessDetails] = useState<businessDetails | null>(null);

    useEffect(() => {
        const fetchBusinessDetails = async () => {
            try {
                const details = await getBusinessDetaild();
                setBusinessDetails(details as businessDetails);
            } catch (error) {
                console.error('Error fetching business details:', error);
            }
        };

        fetchBusinessDetails();
    }, []);

    return (
            <Paper className={classes.footerContainer} elevation={3} style={{ backgroundColor: 'rgb(111, 233, 224)', color: theme.palette.primary.contrastText }}>
                {businessDetails && (
                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
                        <Typography className={classes.detailItem}>{businessDetails.name}</Typography>
                        <Typography className={classes.detailItem}>{businessDetails.adress}</Typography>
                        <Typography className={classes.detailItem}>{businessDetails.phone}</Typography>
                    </div>
                )}
            </Paper>
    );
};

export default BusinessDetailsComponent;