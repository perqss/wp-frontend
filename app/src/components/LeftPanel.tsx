import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    const query = useRef();
    const [columnDefs, setColumnDefs] = useState([]);
    const items = ['Vehicles', 'Bus Lines', 'Tram Lines', 'Special Vehicles', 'Employees', 'Air Readings', 'Stops', 'Tickets', 'Buildings'];
    const [selectedIndex, setSelectedIndex] = useState<number>();

    return (
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '100%', maxWidth: '15%', bgcolor: 'background.paper' }}>
                <List>
                    {items.map((item, index) => 
                        <LeftPanelListItem key={item} text={item} index={index} open={open} setOpen={setOpen} 
                        query={query} columnDefs={columnDefs} setColumnDefs={setColumnDefs} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
                    )}
                </List>
            </Box>
            {open ? <RightPanel query={query.current} columnDefs={columnDefs}/> : ''}
        </Box>
        );
}

export default LeftPanel;