import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import NestedLeftPanelListItem from './NestedLeftPanelListItem';

const LeftPanelListItem = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
        props.setOpen(true);
        props.query.current = props.text.toLowerCase();

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
        }
    };

    const renderVehicleTypes = () => (
        <List>
            <NestedLeftPanelListItem text="Bus Lines"/>
            <NestedLeftPanelListItem text="Tram Lines"/>
            <NestedLeftPanelListItem text="Special"/>
        </List>
    )

    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemText primary={props.text} primaryTypographyProps={{fontSize: 'large'}}/>
                    {!props.expand ? '' : open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                {props.text === 'Vehicles' ? renderVehicleTypes() : ''}
            </Collapse>
        </div>
    );
}

export default LeftPanelListItem;