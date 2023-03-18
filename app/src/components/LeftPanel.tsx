import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';

export enum CategoryEnum {
    AirReadings = 'Air Readings',
    Buildings = 'Buildings',
    BusLines = 'Bus Lines',
    Employees = 'Employees',
    Stops = 'Stops',
    Tickets = 'Tickets',
    TramLines = 'Tram Lines',
    Vehicles = 'Vehicles',
}

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const query = useRef();
    const [columnDefs, setColumnDefs] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const color = '#0c2d64';

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed'}}>
                    <List
                        sx={{backgroundColor: color}}>
                        {Object.values(CategoryEnum).map((item, index) =>
                            <LeftPanelListItem
                                key={item}
                                text={item}
                                index={index}
                                open={open}
                                setOpen={setOpen}
                                query={query}
                                columnDefs={columnDefs}
                                setColumnDefs={setColumnDefs}
                                selectedIndex={selectedIndex}
                                setSelectedIndex={setSelectedIndex}
                                value={value}
                                setValue={setValue}/>
                        )}
                    </List>
                    <div style={{backgroundColor: color, height: '100%'}}/>
                </Box>
                {open ? <RightPanel
                    className='right-panel'
                    query={query.current}
                    columnDefs={columnDefs}
                    value={value}
                    setValue={setValue}
                    />
                    : ''}
            </Box>
        </div>
        );
}

export default LeftPanel;