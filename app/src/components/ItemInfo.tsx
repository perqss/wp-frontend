import React, {useEffect, useState, useRef} from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import UpdateDialog from './UpdateDialog';
import { Button, Dialog, IconButton, Typography, Tooltip, Box, Paper, Grid, DialogTitle } from '@mui/material';

const ItemInfo = (props) => {
    const [holidayData, setHolidayData] = useState();
    const [holidayColumnDefs, setHolidayColumnDefs] = useState<any>();
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const defaultHolidayColDef = {
        flex: 1,
        resizable: true,
        wrapText: true,
        autoHeight: true,
        filter: true,
        sortable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      };
    const [stopsData, setStopsData] = useState<any>();
    const [stopsColumnDefs, setStopsColumnDefs] = useState<any>();
    const defaultStopsColDef = {
        flex: 1,
        resizable: true,
        wrapText: true,
        autoHeight: true,
        filter: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
      };
    var stopsReversed = useRef(false);
    
    const parseStops = (stops) => {
        let data = stops.map(stopName => {return {stopName}});
        return data;
    };

    const handleUpdate = () => {
        setUpdateDialogOpen(true);
    };

    const handleLeftStopsClick = () => {
        if (stopsReversed.current) {
            stopsReversed.current = false;
            let stops = props.details.stops.slice();
            setStopsData(parseStops(stops));
        }
    };

    const handleRightStopsClick = () => {
        if (!stopsReversed.current) {
            stopsReversed.current = true;
            let stops = props.details.stops.slice();
            setStopsData(parseStops(stops.reverse()));
        }
    };

    const handleDelete = () => {
        if (props.query === 'employees') {
            fetch(`${process.env.REACT_APP_URL}/employees/${props.details.employeeID}`, {method: 'DELETE'})
            .then(() => {
                props.setValue(props.value + 1);
            })
        } else if (props.query === 'tickets') {
            fetch(`${process.env.REACT_APP_URL}/tickets/${props.details.ticketId}`, {method: 'DELETE'})
            .then(() => {
                props.setValue(props.value + 1);
            })
        }
    };

    const renderUpdateButtons = () => {
        if (props.query === 'employees') {
            return (
                <Button variant='contained' sx={{marginTop: 5}} onClick={handleUpdate}>
                    Update Employee
                </Button>
            );
        } else if (props.query === 'buildings') {
            return (
                <Button variant='contained' sx={{marginTop: 5}} onClick={handleUpdate}>
                    Update Building
                </Button>
            );
        } else if (props.query === 'tickets') {
            return (
                <Button variant='contained' sx={{marginTop: 5}} onClick={handleUpdate}>
                    Update Ticket
                </Button>
            ); 
        }
    };

    useEffect(() => {
        if (props.query === 'employees') {
            fetch(`${process.env.REACT_APP_URL}/employees/${props.details.employeeID}/holidays`)
            .then(result => result.json())
            .then(data => {
                setHolidayData(data);
                setHolidayColumnDefs([
                    {field: 'dateFrom'},
                    {field: 'dateTo'},
                ]);
            })
        } else if (props.query === 'busLines' || props.query === 'tramLines') {
            setStopsData(parseStops(props.details.stops));
            setStopsColumnDefs([
                {field: 'stopName'},
            ])
        }
      }, [props.details]);

    return (
    <Box sx={{flex: 6, marginLeft: 10}}>
        <Dialog open={updateDialogOpen} onClose={() => setUpdateDialogOpen(false)}>
            <DialogTitle>Update</DialogTitle>
            <UpdateDialog query={props.query} setUpdateDialogOpen={setUpdateDialogOpen} objectToUpdate={props.details} value={props.value} setValue={props.setValue}
            setOpenSnackbar={props.setOpenSnackbar}/>
        </Dialog>
        <Typography variant='h6' gutterBottom sx={{marginTop: 0.6}}>
            Details
        </Typography>
        <Grid container spacing={3}>
            {Object.keys(props.details).map(key => {
                if (key !== 'stops') {
                    return (
                    <Grid item key={key}>
                        <Paper elevation={1} key={key}>
                            {key}: {`${props.details[key]}`}
                        </Paper>
                    </Grid>
                    );
                }
            }
            )}
        </Grid>
        {renderUpdateButtons()}
        {props.query === 'employees' ? 
            <Typography variant='h6' gutterBottom sx={{marginTop: 5}}>
                Holidays
            </Typography> : ''
        }
        {holidayData && 
        <div className='ag-theme-material'>
            <AgGridReact
            className='data'
            domLayout='autoHeight'
            rowData={holidayData}
            columnDefs={holidayColumnDefs}
            defaultColDef={defaultHolidayColDef}
            />
        </div>  
        }
         
        {stopsData && 
            <div style={{marginTop: 15}}>
                <Button onClick={handleLeftStopsClick} sx={{textTransform: 'none'}} variant='contained'>{props.details.stops[0]} - {props.details.stops[props.details.stops.length - 1]}</Button>
                <Button onClick={handleRightStopsClick} sx={{textTransform: 'none', marginLeft: 5}} variant='contained'>{props.details.stops[props.details.stops.length - 1]} - {props.details.stops[0]}</Button>
                <div className='ag-theme-material' style={{marginTop: 20}}>
                    <AgGridReact
                    className='data'
                    domLayout='autoHeight'
                    rowData={stopsData}
                    columnDefs={stopsColumnDefs}
                    defaultColDef={defaultStopsColDef}
                    />
                </div>
            </div>
        }
        {props.query === 'employees' || props.query === 'tickets' ? 
            <Tooltip title='Delete item from database'>
                <IconButton sx={{marginTop: 5}} onClick={handleDelete}>
                    <DeleteOutlinedIcon sx={{color: 'red', fontSize: 40}}/>
                </IconButton>
            </Tooltip> : ''
        }
    </Box>
  )
}

export default ItemInfo;