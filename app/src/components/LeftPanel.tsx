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

export interface Table {
    field: string;
    headerName?: string;
}

const LeftPanel = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);
    const query = useRef<string>('');
    const [columnDefs, setColumnDefs] = useState<Table[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>();
    const color: string = '#0c2d64';
    const [openAddSnackbar, setOpenAddSnackbar] = useState<boolean>(false);
    const [snackbarAddMessage, setSnackbarAddMessage] = useState<string>('');

    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{ width: 200, height: '100vh', display: 'flex', flexDirection: 'column', position: 'fixed'}}>
                    <List sx={{backgroundColor: color}}>
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
                                setValue={setValue}
                                openAddSnackbar={openAddSnackbar}
                                setOpenAddSnackbar={setOpenAddSnackbar}
                                snackbarAddMessage={snackbarAddMessage}
                                setSnackbarAddMessage={setSnackbarAddMessage}/>
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
                    openAddSnackbar={openAddSnackbar}
                    setOpenAddSnackbar={setOpenAddSnackbar}
                    snackbarAddMessage={snackbarAddMessage}
                    setSnackbarAddMessage={setSnackbarAddMessage}/>
                    : ''}
            </Box>
        </div>
        );
}

export default LeftPanel;