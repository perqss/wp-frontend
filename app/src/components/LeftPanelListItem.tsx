import React, { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip, Dialog, DialogTitle, Snackbar, Alert } from '@mui/material';
import Form from './Form';
import Logger from '../logger/Logger';

const LeftPanelListItem = (props) => {
    const logger = Logger.getInstance();
    const addableFields = ['Employees', 'Buildings', 'Air Readings', 'Tickets'];
    const [addFormOpen, setAddFormOpen] = useState(false);
    const [openAddSnackbar, setOpenAddSnackbar] = useState(false);
    const leftPanelColor = '#0e3678';
    const text = props.text.toLowerCase();

    const handleClickOpen = () => {
        props.setSelectedIndex(props.index);
        props.setOpen(true);
        props.query.current = text;
        logger.log(`Getting ${text} from database`);

        if (props.query.current === 'air readings') {
            props.query.current = 'airReadings';
            props.setColumnDefs([
                {field: 'airReadingDate'},
            ])
        } else if (props.query.current === 'employees') {
            props.setColumnDefs([
                {field: 'firstName'},
                {field: 'lastName'},
                {field: 'departmentName'}
            ])
        } else if (props.query.current === 'buildings') {
            props.setColumnDefs([
                {field: 'buildingName'}
            ])
        } else if (props.query.current === 'tickets') {
            props.setColumnDefs([
                {field: 'name'}
            ])
        } else if (props.query.current === 'stops') {
            props.setColumnDefs([
                {field: 'stopName'}
            ])
        } else if (props.query.current === 'bus lines') {
            props.query.current = 'busLines';
            props.setColumnDefs([
                {field: 'lineId'}
            ])
        } else if (props.query.current === 'tram lines') {
            props.query.current = 'tramLines';
            props.setColumnDefs([
                {field: 'lineId'}
            ])
        } else if (props.query.current === 'vehicles') {
            props.setColumnDefs([
                {field: 'vehicleId'},
                {field: 'modelName'},
            ])
        }
    };

    const handleClickAdd = () => {
        setAddFormOpen(true);
    };

    return (
        <div>
            <Dialog open={addFormOpen} onClose={() => setAddFormOpen(false)}>
                <DialogTitle>Add</DialogTitle>
                <Form query={text} setAddFormOpen={setAddFormOpen} value={props.value} setValue={props.setValue}
                setOpenAddSnackbar={setOpenAddSnackbar} add/>
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
                    <ListItemText primary={props.text} primaryTypographyProps={{fontSize: 'large', color: 'white'}}/>
                </ListItemButton>
                {addableFields.includes(props.text) &&
                    <Tooltip title={`Add new ${props.text.toLowerCase().substr(0, props.text.length - 1)} to database`} placement='right'>
                        <IconButton onClick={handleClickAdd}>
                            <AddIcon sx={{color: 'white'}}/>
                        </IconButton>
                    </Tooltip>
                }  
            </ListItem>
            <Snackbar open={openAddSnackbar} autoHideDuration={2000} onClose={() => setOpenAddSnackbar(false)}>
                <Alert onClose={() => setOpenAddSnackbar(false)} severity='success' variant='filled'> 
                        Successfully updated database
                </Alert>
            </Snackbar>
        </div>
    );
}

export default LeftPanelListItem;