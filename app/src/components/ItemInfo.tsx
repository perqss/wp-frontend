import React, {useEffect, useRef, useState} from 'react';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Form from './Form';
import {Box, Button, Dialog, DialogTitle, Grid, IconButton, Paper, Tooltip, Typography} from '@mui/material';
import Logger from '../logger/Logger';
import {ItemInfoButton} from './MaterialComponentsCss';
import {CategoryEnum, Table} from './LeftPanel';
import {deleteEmployee} from "../clients/EmployeesClient";
import {deleteTicket} from "../clients/TicketsClient";

interface Holiday {
    employeeId: number;
    dateFrom: any;
    dateTo: any;
}

interface Stop {
    stopName: string;
}

const ItemInfo = (props: {
        details: any;
        setDetails: React.Dispatch<React.SetStateAction<any>>;
        query: string;
        value: number;
        setValue: React.Dispatch<React.SetStateAction<number>>;
        setOpenUpdateSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
        setSnackbarUpdateMessage: React.Dispatch<React.SetStateAction<string>>;
        setOpenDeleteSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
        setSnackbarDeleteMessage: React.Dispatch<React.SetStateAction<string>>;
    }) => {
    const logger: Logger = Logger.getInstance();
    logger.log(`Object sent to ItemInfo: ${JSON.stringify(props.details)}`);

    const [holidayData, setHolidayData] = useState<Holiday[]>();
    const [holidayColumnDefs, setHolidayColumnDefs] = useState<Table[]>([]);
    const [updateFormOpen, setUpdateFormOpen] = useState<boolean>(false);
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
    const [stopsData, setStopsData] = useState<Stop[]>();
    const [stopsColumnDefs, setStopsColumnDefs] = useState<Table[]>();
    const defaultStopsColDef = defaultColDef;
    const [repairsData, setRepairsData] = useState<any>();
    const [repairsColumnDefs, setRepairsColumnDefs] = useState<Table[]>();
    const defaultRepairsColDef = defaultColDef;
    const stopsReversed = useRef<boolean>(false);
    
    const parseStops = (stops: string[]) => {
        return stops.map(stopName => {
            return {stopName}
        });
    };

    const parseHolidays = (holidays: Holiday[]) => {
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
            const stops = props.details.stops.slice().reverse();
            setStopsData(parseStops(stops));
        }
    };

    const handleDelete = () => {
        if (props.query === CategoryEnum.Employees) {
            deleteEmployee(props.details.employeeID)
            .then(() => {
                props.setOpenDeleteSnackbar(true);
                props.setSnackbarDeleteMessage('Successfully deleted employee');
                props.setValue(props.value + 1);
            })
        } else if (props.query === CategoryEnum.Tickets) {
           deleteTicket(props.details.ticketId)
            .then(() => {
                props.setOpenDeleteSnackbar(true);
                props.setSnackbarDeleteMessage('Successfully deleted ticket');
                props.setValue(props.value + 1);
            })
        }
    };

    const renderUpdateButtons = () => {
        let text = '';
        if (props.query === CategoryEnum.Employees && 'employeeID' in props.details) {
            text = 'Update Employee';
        } else if (props.query === CategoryEnum.Buildings && 'buildingId' in props.details) {
            text = 'Update Building';
        } else if (props.query === CategoryEnum.Tickets && 'ticketId' in props.details) {
            text = 'Update Ticket';
        }
        if (text !== '') {
            return (
                <ItemInfoButton
                    variant='contained'
                    onClick={handleUpdate}
                >
                    {text}
                </ItemInfoButton>
            )
        }
    };

    useEffect(() => {
        if (props.query === CategoryEnum.Employees) {
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
        } else if (props.query === CategoryEnum.BusLines || props.query === CategoryEnum.TramLines) {
            setStopsData(parseStops(props.details.stops));
            setStopsColumnDefs([
                {field: 'stopName'},
            ])
        } else if (props.query === CategoryEnum.Vehicles) {
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
        const wordsNotToChange = ['NO2', 'O3', 'PM10', 'PM25', 'SO2'];
        const map = {'lineId': 'Line number'};

        if (camelCaseWord in map) {
            return map[camelCaseWord];
        } else if (!wordsNotToChange.includes(camelCaseWord)) {
            const result = camelCaseWord.replace(/([A-Z])/g, " $1");
            return result.charAt(0).toUpperCase() + result.slice(1);
        } else {
            return camelCaseWord;
        }
      };

      const parseObjectValue = (value: string) => {
          const map = {'false': 'No', 'true': 'Yes'}
          return value in map ? map[value] : value;
      } 

    return (
        <Box sx={{flex: 6, marginLeft: 10}}>
            <Dialog
                open={updateFormOpen}
                onClose={() => setUpdateFormOpen(false)}
            >
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
            <Typography
                variant='h6'
                gutterBottom
                sx={{marginTop: 0.6, color: '#0c2d64'}}
            >
                Details
            </Typography>
            <Grid
                container
                spacing={3}
            >
                {Object.keys(props.details).map(key => {
                    const keysNotToInclude = ['stops', 'repairHistory', 'no2', 'o3', 'pm10', 'pm25', 'so2']
                    const idRegex = new RegExp('([a-zA-Z])*[iI][dD]')
                    if (!idRegex.test(key) && !keysNotToInclude.includes(key)) {
                        return (
                            <Grid
                                item
                                key={key}
                            >
                                <Paper
                                    elevation={1}
                                    key={key}
                                >
                                    {camelToTitle(key)}: {parseObjectValue(`${props.details[key]}`)}
                                </Paper>
                            </Grid>
                        );
                    }
                }
                )}
            </Grid>
            {renderUpdateButtons()}
            {props.query === CategoryEnum.Employees || props.query === CategoryEnum.Tickets ?
                <Tooltip title='Delete item from database'>
                    <IconButton
                        sx={{marginTop: 5}}
                        onClick={handleDelete}
                    >
                        <DeleteOutlinedIcon
                            sx={{color: 'red', fontSize: 40}}
                        />
                    </IconButton>
                </Tooltip> : ''
            }
            {props.query === CategoryEnum.Employees ?
                <Typography
                    variant='h6'
                    gutterBottom
                    sx={{marginTop: 5, color: '#0c2d64'}}
                >
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
                    <Button
                        onClick={handleLeftStopsClick}
                        sx={{textTransform: 'none', backgroundColor: '#0c2d64'}}
                        variant='contained'
                    >
                        {props.details.stops.at(0)} - {props.details.stops.at(-1)}
                    </Button>
                    <Button
                        onClick={handleRightStopsClick}
                        sx={{textTransform: 'none', marginLeft: 5, backgroundColor: '#0c2d64'}}
                        variant='contained'
                    >
                        {props.details.stops.at(-1)} - {props.details.stops.at(0)}
                    </Button>
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
            {props.query === CategoryEnum.Vehicles ?
                <Typography
                    variant='h6'
                    gutterBottom
                    sx={{marginTop: 5, color: '#0c2d64'}}
                >
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