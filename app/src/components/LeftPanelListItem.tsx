import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

// const StyledListItemButton = styled(ListItemButton)({
//     // selected and (selected + hover) states
//     '&& .Mui-selected, && .Mui-selected:hover': {
//       backgroundColor: 'red',
//       '&, & .MuiListItemIcon-root': {
//         color: 'pink',
//       },
//     },
//     // hover states
//     '& .MuiListItemButton-root:hover': {
//       backgroundColor: 'orange',
//       '&, & .MuiListItemIcon-root': {
//         color: 'yellow',
//       },
//     },
//   });

const LeftPanelListItem = (props) => {
    const LeftPanelColor = '#1976d2';

    const handleClickOpen = () => {
        props.setSelectedIndex(props.index);
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
        }
    };

    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton 
                    onClick={handleClickOpen} 
                    selected={props.selectedIndex === props.index}
                    sx={{
                        '&.Mui-selected': {
                            backgroundColor: LeftPanelColor,
                        },
                        '&.Mui-selected:hover': {
                            backgroundColor: LeftPanelColor,
                        },
                        ':hover': {
                            backgroundColor: LeftPanelColor,
                        }
                    }}>
                    <ListItemText primary={props.text} primaryTypographyProps={{fontSize: 'large'}}/>
                </ListItemButton>
            </ListItem>
        </div>
    );
}

export default LeftPanelListItem;