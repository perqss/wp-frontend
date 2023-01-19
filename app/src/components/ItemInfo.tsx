import React, {useEffect, useState, useRef} from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Form from './Form';
import { Button, Dialog, IconButton, Typography, Tooltip, Box, Paper, Grid, DialogTitle, Snackbar, Alert } from '@mui/material';
import Logger from '../logger/Logger';
import { ItemInfoButton } from './MaterialComponentsCss';

const ItemInfo = (props) => {
    const logger = Logger.getInstance();
    logger.log(`Object sent to ItemInfo: ${JSON.stringify(props.details)}`);

    const [holidayData, setHolidayData] = useState();
    const [holidayColumnDefs, setHolidayColumnDefs] = useState<any>();
    const [updateFormOpen, setUpdateFormOpen] = useState(false);
    const defaultColDef = {
        flex: 1,
        resizable: true,
        wrapText: true,
        autoHeight: true,
        filter: true,
        sortable: true,
        wrapHeaderText: true,
        autoHeaderHeight: true,
    };
    const defaultHolidayColDef = defaultColDef;
    const [stopsData, setStopsData] = useState<any>();
    const [stopsColumnDefs, setStopsColumnDefs] = useState<any>();
    const defaultStopsColDef = defaultColDef;
    const [repairsData, setRepairsData] = useState<any>();
    const [repairsColumnDefs, setRepairsColumnDefs] = useState<any>();
    const defaultRepairsColDef = defaultColDef;
    var stopsReversed = useRef(false);
    
    const parseStops = (stops) => {
        let data = stops.map(stopName => {return {stopName}});
        return data;
    };

    const parseHolidays = (holidays) => {
        for (let i = 0; i < holidays.length; i++) {
            holidays[i].dateFrom = holidays[i].dateFrom.join('-');
            holidays[i].dateTo = holidays[i].dateTo.join('-');
        }
        return holidays;
    };

    const handleUpdate = () => {
        setUpdateFormOpen(true);
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
                props.setOpenDeleteSnackbar(true);
                props.setSnackbarDeleteMessage('Successfully deleted employee');
            })
        } else if (props.query === 'tickets') {
            fetch(`${process.env.REACT_APP_URL}/tickets/${props.details.ticketId}`, {method: 'DELETE'})
            .then(() => {
                props.setOpenDeleteSnackbar(true);
                props.setSnackbarDeleteMessage('Successfully deleted ticket');
            })
        }
        props.setValue(props.value + 1);
    };

    const renderUpdateButtons = () => {
        if (props.query === 'employees') {
            return (
                <ItemInfoButton variant='contained' onClick={handleUpdate}>
                    Update Employee
                </ItemInfoButton>
            );
        } else if (props.query === 'buildings') {
            return (
                <ItemInfoButton variant='contained' onClick={handleUpdate}>
                    Update Building
                </ItemInfoButton>
            );
        } else if (props.query === 'tickets') {
            return (
                <ItemInfoButton variant='contained' onClick={handleUpdate}>
                    Update Ticket
                </ItemInfoButton>
            ); 
        }
    };

    useEffect(() => {
        if (props.query === 'employees') {
            fetch(`${process.env.REACT_APP_URL}/employees/${props.details.employeeID}/holidays`)
            .then(result => result.json())
            .then(data => {
                parseHolidays(data)
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
        } else if (props.query === 'vehicles') {
            setRepairsData(props.details.repairHistory);
            setRepairsColumnDefs([
                {field: 'dateFrom'},
                {field: 'dateTo'},
                {field: 'notes'},
                {field: 'technicianFirstName'},
                {field: 'technicianLastName'},
            ])
        }
      }, [props.details]);

      const camelToTitle = (camelCaseWord: string) => {
        if (camelCaseWord === 'employeeID') {
            return 'Employee ID';
        } else if (camelCaseWord === 'departmentID') {
            return 'Department ID';
        } else if (camelCaseWord !== 'NO2' && camelCaseWord !== 'O3' && camelCaseWord !== 'PM10' && camelCaseWord !== 'PM25' && camelCaseWord !== 'SO2') {
            const result = camelCaseWord.replace(/([A-Z])/g, " $1");
            const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
            return finalResult;
        } else {
            return camelCaseWord;
        }
      };

      const parseObjectValue = (value) => {
        if (value === 'false') {
            return 'No';
        } else if (value === 'true') {
            return 'Yes';
        } else {
            return value;
        }
      } 

    return (
    <Box sx={{flex: 6, marginLeft: 10}}>
        <Dialog open={updateFormOpen} onClose={() => setUpdateFormOpen(false)}>
            <DialogTitle>Update</DialogTitle>
            <Form
                query={props.query}
                setUpdateFormOpen={setUpdateFormOpen}
                objectToUpdate={props.details}
                value={props.value}
                setValue={props.setValue}
                setOpenUpdateSnackbar={props.setOpenUpdateSnackbar}
                setSnackbarUpdateMessage={props.setSnackbarUpdateMessage}
            />
        </Dialog>
        <Typography variant='h6' gutterBottom sx={{marginTop: 0.6, color: '#0c2d64'}}>
            Details
        </Typography>
        <Grid container spacing={3}>
            {Object.keys(props.details).map(key => {
                if (key !== 'stops' && key !== 'repairHistory' && key !== 'no2' && key !== 'o3' && key !== 'pm10' && key !== 'pm25' && key !== 'so2') {
                    return (
                    <Grid item key={key}>
                        <Paper elevation={1} key={key}>
                            {camelToTitle(key)}: {parseObjectValue(`${props.details[key]}`)}
                        </Paper>
                    </Grid>
                    );
                }
            }
            )}
        </Grid>
        {renderUpdateButtons()}
        {props.query === 'employees' || props.query === 'tickets' ? 
            <Tooltip title='Delete item from database'>
                <IconButton sx={{marginTop: 5}} onClick={handleDelete}>
                    <DeleteOutlinedIcon sx={{color: 'red', fontSize: 40}}/>
                </IconButton>
            </Tooltip> : ''
        }
        {props.query === 'employees' ? 
            <Typography variant='h6' gutterBottom sx={{marginTop: 5, color: '#0c2d64'}}>
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
                <Button onClick={handleLeftStopsClick} sx={{textTransform: 'none', backgroundColor: '#0c2d64'}} variant='contained'>
                    {props.details.stops[0]} - {props.details.stops[props.details.stops.length - 1]}</Button>
                <Button onClick={handleRightStopsClick} sx={{textTransform: 'none', marginLeft: 5, backgroundColor: '#0c2d64'}} variant='contained'>
                    {props.details.stops[props.details.stops.length - 1]} - {props.details.stops[0]}</Button>
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
        {props.query === 'vehicles' ? 
            <Typography variant='h6' gutterBottom sx={{marginTop: 5, color: '#0c2d64'}}>
                Repair History
            </Typography> : ''
        }
        {repairsData &&
            <div style={{marginTop: 15}}>
                <div className='ag-theme-material' style={{marginTop: 20}}>
                    <AgGridReact
                    className='data'
                    domLayout='autoHeight'
                    rowData={repairsData}
                    columnDefs={repairsColumnDefs}
                    defaultColDef={defaultRepairsColDef}
                    />
                </div>
            </div>
        }
    </Box>
  )
}

export default ItemInfo;