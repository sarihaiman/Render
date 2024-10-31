import React, { useState } from 'react';
import { Box, Tabs, Tab, Popover, MenuItem, Paper } from '@mui/material';
import logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillDataCurrentUser } from '../redux/userAction.ts';

export default function TopNav() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const isAdmin: boolean = useSelector((state: any) => {
    return state.userReducer.currentUser.isAdmin;
  });

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('currentUser')!);

    if (token && user) {
      dispatch(FillDataCurrentUser(user));
    }
  }, [dispatch]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ marginBottom: '20px', marginLeft: '8px', display: 'flex', alignItems: 'center', width: '100%', bgcolor: 'background.paper', '& .MuiTab-root': { '&:focus': { outline: 'none' }, '&.Mui-selected': { outline: 'none' } } }}>
      <img src={logo} alt="Logo" style={{ marginLeft: '30px', marginRight: '5px', height: '50px' }} />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="home" component={Link} to="/home" />
        <Tab label="gallery" component={Link} to="/gallery" />
        <Tab label="orders" component={Link} to="/order" />
        <Tab label="contact" component={Link} to="/contact" />
        <Tab label="upload" component={Link} to="/upload" />
        {isAdmin && <Tab label="manager" onClick={handleOpenMenu} />}
      </Tabs>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper>
          <MenuItem component={Link} to="/admin/businessDetails" onClick={handleCloseMenu}>business details</MenuItem>
          <MenuItem component={Link} to="/admin/potographyPackage" onClick={handleCloseMenu}>potography package</MenuItem>
          <MenuItem component={Link} to="/admin/orders" onClick={handleCloseMenu}>orders</MenuItem>
          <MenuItem component={Link} to="/admin/customers" onClick={handleCloseMenu}>customers</MenuItem>
          <MenuItem component={Link} to="/admin/upload" onClick={handleCloseMenu}>uploads</MenuItem>
          <MenuItem component={Link} to="/admin/feedback" onClick={handleCloseMenu}>feedback</MenuItem>
          <MenuItem component={Link} to="/admin/image" onClick={handleCloseMenu}>image</MenuItem>
        </Paper>
      </Popover>
    </Box>
  );
}