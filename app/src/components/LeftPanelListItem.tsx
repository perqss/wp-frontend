import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip, Dialog, DialogTitle } from '@mui/material';

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
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const leftPanelColor = '#1976d2';

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
            <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
                <DialogTitle>Add</DialogTitle>
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
                    <ListItemText primary={props.text} primaryTypographyProps={{fontSize: 'large'}}/>
                </ListItemButton>
                <Tooltip title={`Add new ${props.text.toLowerCase().substr(0, props.text.length - 1)} to database`} placement='right'>
                    <IconButton>
                        <AddIcon/>
                    </IconButton>
                </Tooltip>
            </ListItem>
        </div>
    );
}

export default LeftPanelListItem;