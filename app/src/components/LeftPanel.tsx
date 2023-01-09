import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';

//TODO: zmienić renderowanie LeftPanelListItem na pętlę

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    const query = useRef();
    const columnDefs = useRef();

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '100%', maxWidth: '15%', bgcolor: 'background.paper' }}>
                <List>
                    <LeftPanelListItem text="Vehicles" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs} expand/>
                    <LeftPanelListItem text="Employees" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                    <LeftPanelListItem text="Air Readings" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                    <LeftPanelListItem text="Stops" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                    <LeftPanelListItem text="Passengers" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                    <LeftPanelListItem text="Tickets" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                    <LeftPanelListItem text="Buildings" open={open} setOpen={setOpen} query={query} columnDefs={columnDefs}/>
                </List>
            </Box>
            {open ? <RightPanel query={query.current} columnDefs={columnDefs.current}/> : ''}
        </Box>
        );
}

export default LeftPanel;