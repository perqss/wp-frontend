import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const query = useRef();
    const gridRef = useRef<any>(null);
    const [columnDefs, setColumnDefs] = useState([]);
    const items = ['Employees', 'Air Readings', 'Buildings', 'Tickets', 'Vehicles', 'Tram Lines', 'Bus Lines', 'Stops'];
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const color = '#0c2d64';

    // const onPageSizeChanged = () => {
    //     var value = (document.getElementById('page-size') as HTMLInputElement).value;
    //     gridRef.current.api.paginationSetPageSize(Number(value));
    // };

    return (
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ width: '100vw', maxWidth: '15vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
                    <List sx={{backgroundColor: color}}>
                        {items.map((item, index) => 
                            <LeftPanelListItem key={item} text={item} index={index} open={open} setOpen={setOpen} 
                            query={query} columnDefs={columnDefs} setColumnDefs={setColumnDefs} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                            value={value} setValue={setValue}/>
                        )}
                    </List>
                    {/* <select onChange={() => onPageSizeChanged()} id="page-size" defaultValue={15} style={{height: 200, backgroundColor: '#e7efee'}}>
                        <option value="15">15</option>
                        <option value="25">25</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                        <option value="1000">1000</option>
                        <option value="1500">1500</option>
                    </select> */}
                    <div style={{backgroundColor: color, height: '100%'}}/>
                </Box>
                {open ? <RightPanel query={query.current} columnDefs={columnDefs} value={value} setValue={setValue}/> : ''}
            </Box>
        );
}

export default LeftPanel;