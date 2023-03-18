import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import {Alert, Dialog, DialogTitle, IconButton, ListItemIcon, Snackbar, Tooltip} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import AirIcon from '@mui/icons-material/Air';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CommuteIcon from '@mui/icons-material/Commute';
import TramIcon from '@mui/icons-material/Tram';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import Form from './Form';
import Logger from '../logger/Logger';
import {CategoryEnum} from "./LeftPanel";

const LeftPanelListItem = (props) => {
    const logger = Logger.getInstance();
    const addableFields = ['Employees', 'Buildings', 'Air Readings', 'Tickets'];
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
    const [snackbarAddMessage, setSnackbarAddMessage] = useState();
    const leftPanelColor = '#0e3678';
    const text = props.text as CategoryEnum

    const handleClickOpen = () => {
        props.setSelectedIndex(props.index);
        props.setOpen(true);
        props.query.current = text;
        logger.log(`Getting ${text} from database`);

        switch (props.query.current) {
            case CategoryEnum.AirReadings:
                props.setColumnDefs([
                    {field: 'airReadingDate'},
                ])
                break;
            case CategoryEnum.Buildings:
                props.setColumnDefs([
                    {field: 'buildingName'},
                    {field: 'address'}
                ])
                break;
            case CategoryEnum.BusLines:
                props.setColumnDefs([
                    {field: 'lineId', headerName: 'Line Number'}
                ])
                break;
            case CategoryEnum.Employees:
                props.setColumnDefs([
                    {field: 'firstName'},
                    {field: 'lastName'},
                    {field: 'departmentName'}
                ])
                break;
            case CategoryEnum.Stops:
                props.setColumnDefs([
                    {field: 'stopName'}
                ])
                break;
            case CategoryEnum.TramLines:
                props.setColumnDefs([
                    {field: 'lineId', headerName: 'Line Number'}
                ])
                break;
            case CategoryEnum.Tickets:
                props.setColumnDefs([
                    {field: 'name'}
                ])
                break;
            case CategoryEnum.Vehicles:
                props.setColumnDefs([
                    {field: 'vehicleId'},
                    {field: 'modelName'},
                ])
                break;
        }
    };

    const renderIcons = () => {
        switch (text) {
            case CategoryEnum.AirReadings:
                return (
                    <ListItemIcon>
                        <AirIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.Buildings:
                return (
                    <ListItemIcon>
                        <ApartmentIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.BusLines:
                return (
                    <ListItemIcon>
                        <DirectionsBusIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.Employees:
                return (
                    <ListItemIcon>
                        <BadgeIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.Stops:
                return (
                    <ListItemIcon>
                        <AirlineStopsIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.TramLines:
                return (
                    <ListItemIcon>
                        <TramIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.Tickets:
                return (
                    <ListItemIcon>
                        <BookOnlineIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
            case CategoryEnum.Vehicles:
                return (
                    <ListItemIcon>
                        <CommuteIcon sx={{color: 'white'}}/>
                    </ListItemIcon>
                );
        }
    };

    const handleClickAdd = () => {
        setAddFormOpen(true);
    };

    return (
        <div>
            <Dialog open={addFormOpen} onClose={() => setAddFormOpen(false)}>
                <DialogTitle>Add</DialogTitle>
                <Form
                    query={text}
                    setAddFormOpen={setAddFormOpen}
                    value={props.value}
                    setValue={props.setValue}
                    setOpenAddSnackbar={setOpenAddSnackbar}
                    setSnackbarAddMessage={setSnackbarAddMessage}
                    add
                />
            </Dialog>
            <ListItem disablePadding>
                <ListItemButton 
                    onClick={handleClickOpen} 
                    selected={props.selectedIndex === props.index}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: leftPanelColor,
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: leftPanelColor,
                        },
                        ':hover': {
                            backgroundColor: leftPanelColor,
                        }
                    }}>
                    {renderIcons()}
                    <ListItemText
                        primary={props.text}
                        primaryTypographyProps={{fontSize: 'large', color: 'white'}}/>
                </ListItemButton>
                {addableFields.includes(props.text) &&
                    <Tooltip
                        title={`Add new ${props.text.toLowerCase().substr(0, props.text.length - 1)} to database`}
                        placement='right'
                    >
                        <IconButton onClick={handleClickAdd}>
                            <AddIcon sx={{color: 'white'}}/>
                        </IconButton>
                    </Tooltip>
                }  
            </ListItem>
            <Snackbar
                open={openAddSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenAddSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenAddSnackbar(false)}
                    severity='success'
                    variant='filled'
                >
                    {snackbarAddMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default LeftPanelListItem;