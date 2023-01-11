import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    const query = useRef();
    const [columnDefs, setColumnDefs] = useState([]);
    const items = ['Vehicles', 'Employees', 'Air Readings', 'Stops', 'Tickets', 'Buildings'];

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '100%', maxWidth: '15%', bgcolor: 'background.paper' }}>
                <List>
                    {items.map(item => {
                        if (item === 'Vehicles') {
                            return (
                            <LeftPanelListItem text={item} open={open} setOpen={setOpen} query={query} columnDefs={columnDefs} setColumnDefs={setColumnDefs} expand/>
                            );
                        } else {
                            return (
                            <LeftPanelListItem text={item} open={open} setOpen={setOpen} query={query} columnDefs={columnDefs} setColumnDefs={setColumnDefs}/>
                            );
                        }
                    })}
                </List>
            </Box>
            {open ? <RightPanel query={query.current} columnDefs={columnDefs}/> : ''}
        </Box>
        );
}

export default LeftPanel;