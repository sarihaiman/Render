import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Dialog, DialogTitle, DialogContent, TextField, Typography, IconButton, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { getOrderPackage, deleteOrderPackage, editOrderPackage, addOrderPackage } from '../../api/order.api';
import { OrderPackage } from '../../interface/order.interface';
import { PotographyPackage } from '../../interface/PotographyPackage.interface';
import { getAllPotograpyName } from '../../api/PotographyPackage.api';
import { getAllUsers } from '../../api/user.api';
import { Delete, Edit, Save, Close, Add } from '@mui/icons-material';
import isTokenValid from '../../utils/checkToken';
import { isTimeValid, isDateValid, isFormValid } from '../../utils/validation'
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);

const AdminCalendar = () => {
  const [events, setEvents] = useState<OrderPackage[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<OrderPackage | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responsePackageName, setResponsePackageName] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedOrder, setEditedOrder] = useState<OrderPackage | null>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [packageName, setPackageName] = useState('');
  const [userName, setuserName] = useState('');
  const [nameUser, setnameUser] = useState([]);
  const [date, setDate] = useState('');
  const [beginingHour, setBeginingHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [packages, setPackages] = useState<PotographyPackage[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responsePackageName = await getAllPotograpyName();
        setResponsePackageName(responsePackageName);

        const responseUsers = await getAllUsers();
        setUsers(responseUsers);

        const dataPackageName = responsePackageName;
        const packageNames = dataPackageName.map((item: any) => ({ id: item.id, type: item.type }));
        setPackages(packageNames);

        const datauserName = responseUsers;
        const packageNames2 = datauserName.map((item: any) => ({ id: item.id, name: item.name }));
        setnameUser(packageNames2);

        const response = await getOrderPackage();
        if (response.status !== 200) {
          throw new Error('Failed to fetch events');
        }
        const data: OrderPackage[] = response.data;
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: 'rgb(111, 233, 224)',
        color: 'black',
        borderRadius: '5px',
        border: '1px solid black',
        padding: '5px',
        cursor: 'pointer',
      }
    };
  };

  const handleEventClick = (event: OrderPackage) => {
    setEditingIndex(null);
    setEditedOrder(null);
    setSelectedEvent(event);
    setOpenDialog(true);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setuserName('');
    setPackageName('');
    setDate('');
    setBeginingHour('');
    setEndHour('');
    setIsDialogOpen(false)
  };

  const getUserById = (userId: number) => {
    return users.find((user: { id: number; }) => user.id === userId);
  };

  const handleSave = async () => {
    if (!isTimeValid(editedOrder?.beginingHour, editedOrder?.endHour) || !isDateValid(new Date(editedOrder!.date))) {
      return;
    }
    console.log(editedOrder);
    try {
      if (editedOrder) {
        const response = await editOrderPackage(editedOrder);
        if (response.status === 200) {
          const updatedEvents = events.map((event) => (event.id === editedOrder.id ? editedOrder : event));
          setEvents(updatedEvents);
          setOpenDialog(false);
        } else {
          console.error('Failed to save the edited order');
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data,
      });
    }
  };

  const handleEdit = () => {
    const eventDate = new Date(selectedEvent!.date);
    const currentDate = new Date();
    if (eventDate >= currentDate) {
      setEditingIndex(selectedEvent?.id ?? null);
      setEditedOrder(selectedEvent);
    }
    else
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You cannot edit past events.',
      });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedOrder(null);
  };

  const handleAddOrder = async () => {
    if (!isTokenValid()) { return; }
    if (!isFormValid(packageName, new Date(date), beginingHour, endHour) || !isTimeValid(beginingHour, endHour) || !isDateValid(new Date(date))) {
      return;
    }
    try {
      const selectedPackage = packages.find((pkg: any) => pkg.type === packageName);
      const selectedUser = nameUser.find((pkg: any) => pkg.name === userName);
      if (!selectedPackage) {
        throw new Error('Selected package not found');
      }
      if (!selectedUser) {
        throw new Error('Selected package not found');
      }
      const order: OrderPackage = {
        id: 0,
        userid: selectedUser['id'],
        packageId: Number(selectedPackage['id']),
        date: date.replace(/-/g, '/'),
        beginingHour,
        endHour
      };
      console.log(order);
      const response = await addOrderPackage(order);
      console.log(response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your order has been successfully added.',
      });
      console.log('Order added successfully:', order);
      setuserName('');
      setPackageName('');
      setDate('');
      setBeginingHour('');
      setEndHour('');
      setIsDialogOpen(false);
      setEvents([...events, order]);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data,
      });
    }
  };

  const handleDelete = () => {
    deleteOrderPackage(selectedEvent!.id)
    const updatedEvents = events.filter((event) => event.id !== selectedEvent?.id);
    setEvents(updatedEvents);
    setOpenDialog(false);
  };

  const handleChange = (e: any, fieldName: string) => {
    const { value } = e.target;
    setEditedOrder((prevOrder: any) => ({
      ...prevOrder,
      [fieldName]: value,
    }));
  };

  const inputStyle: React.CSSProperties = {
    height: '55px',
    width: '100%',
    marginBottom: '30px',
  };

  const dialogContentStyle: React.CSSProperties = {
    height: '300px',
    width: '400px',
    overflowY: 'auto',
  };

  return (
    <div>
      <Button onClick={() => setIsDialogOpen(true)} startIcon={<Add />} style={{ marginBottom: '10px', marginTop: '10px', marginLeft: '40px' }}>Add New Order</Button>
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} style={{ position: 'absolute', zIndex: 100 }}>
        <DialogTitle style={{ marginTop: '20px' }}>
          Add New Order
          <IconButton style={{ position: 'absolute', right: 0, top: 0 }} onClick={handleCloseDialog}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ width: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
          <br />
          <FormControl fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              label="User"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            >
              {nameUser.map((option: any) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth style={inputStyle}>
            <InputLabel id="demo-simple-select-label">Photography Package</InputLabel>
            <Select
              label="Photography Package"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            >
              {packages.map((option: any) => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />
          <TextField
            label="Beginning Hour"
            type="time"
            value={beginingHour}
            onChange={(e) => setBeginingHour(e.target.value)}
            style={inputStyle}
          />
          <TextField
            label="End Hour"
            type="time"
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
            style={inputStyle}
          />
          <Button onClick={handleAddOrder} variant="contained" color="primary" style={{ marginTop: '20px' }}>Add</Button>
        </DialogContent>
      </Dialog>
      <Calendar
        localizer={localizer}
        events={events.map((order) => ({
          ...order,
          title: `${packages.find((pkg: any) => pkg.id === order.packageId)?.type}`,
        }))}
        startAccessor={(event) => new Date(event.date)}
        endAccessor={(event) => new Date(event.date)}
        style={{ textDecoration: 'none', height: 500, margin: '20px 20px 20px 20px', fontFamily: 'Roboto,Helvetica Neue,Arial,sans-serif' }} onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
      />
      <Dialog open={openDialog} onClose={handleClosePopup} style={{ position: 'absolute', zIndex: 100 }}>
        <DialogTitle>
          <div style={{ display: 'flex', justifyContent: 'flex-end', right: 0, marginTop: '-5px' }}>
            {editingIndex !== selectedEvent?.id && (
              <IconButton aria-label="close" onClick={handleClosePopup} style={{ position: 'absolute', right: 8, top: 8 }}>
                <Close />
              </IconButton>
            )}
            {editingIndex !== selectedEvent?.id && (
              <IconButton onClick={handleEdit} style={{ position: 'absolute', right: 45, top: 8 }}>
                <Edit />
              </IconButton>
            )}
            {editingIndex !== selectedEvent?.id && (
              <IconButton onClick={handleDelete} style={{ position: 'absolute', right: 82, top: 8 }}>
                <Delete />
              </IconButton>
            )}
          </div>
          {editingIndex === selectedEvent?.id && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', right: 0, marginTop: '-5px' }}>
              <IconButton onClick={handleSave}>
                <Save />
              </IconButton>
              <IconButton onClick={handleCancelEdit}>
                <Close />
              </IconButton>
            </div>
          )}
        </DialogTitle>
        <DialogContent style={dialogContentStyle}>
          {editingIndex === selectedEvent?.id ? (
            <>
              <br></br>
              <TextField
                label="Date"
                type="date"
                value={moment(selectedEvent.date[0]).format('YYYY-MM-DD')}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: moment(e.target.value).format('YYYY/MM/DD') })}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                margin="normal"
                style={{ marginBottom: '30px' }}
              />
              <TextField
                label="Beginning Hour"
                type="time"
                value={editedOrder?.beginingHour ? editedOrder.beginingHour : selectedEvent?.beginingHour}
                onChange={(e) => handleChange(e, 'beginingHour')}
                style={inputStyle}
              />

              <TextField
                label="End Hour"
                type="time"
                value={editedOrder?.endHour ? editedOrder.endHour : selectedEvent?.endHour}
                onChange={(e) => handleChange(e, 'endHour')}
                style={inputStyle}
              />
            </>
          ) : (
            <>
              <Typography variant="h4"><strong>{!editingIndex && selectedEvent && responsePackageName && responsePackageName[selectedEvent.packageId] ? responsePackageName[selectedEvent.packageId].type : 'Loading...'}</strong></Typography>
              <Typography variant="h6"><strong>User Name:</strong> {selectedEvent && getUserById(selectedEvent.userid)?.name}</Typography>
              <Typography variant="h6"><strong>User Phone: </strong> {selectedEvent && getUserById(selectedEvent.userid)?.phone}</Typography>
              <Typography variant="h6"><strong>User Email: </strong> {selectedEvent && getUserById(selectedEvent.userid)?.email}</Typography>
              <Typography variant="h6"><strong>date: </strong> {selectedEvent?.date}</Typography>
              <Typography variant="h6"><strong>beginingHour: </strong> {selectedEvent?.beginingHour}</Typography>
              <Typography variant="h6"><strong>endHour:</strong>  {selectedEvent?.endHour}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCalendar;