import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import LeftPanelListItem from './LeftPanelListItem';
import RightPanel from './RightPanel';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';

const LeftPanel = () => {
    const [open, setOpen] = useState(false);
    //const [openPanel, setOpenPanel] = useState(true);
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
        <div style={{width: '100vw', height: '100vh'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed'}}>
                    <List sx={{backgroundColor: color}}>
                        {items.map((item, index) => 
                            <LeftPanelListItem key={item} text={item} index={index} open={open} setOpen={setOpen} 
                            query={query} columnDefs={columnDefs} setColumnDefs={setColumnDefs} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                            value={value} setValue={setValue}/>
                        )}
                    </List>
                    {/* <div style={{backgroundColor: color, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                         <IconButton sx={{color: 'white'}}>
                            {openPanel ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}
                        </IconButton> 
                    </div> */}
                    <div style={{backgroundColor: color, height: '100%'}}/>
                </Box>

                {open ? <RightPanel className='right-panel' query={query.current} columnDefs={columnDefs} value={value} setValue={setValue}/> : ''}
            </Box>
        </div>
        );
}

export default LeftPanel;