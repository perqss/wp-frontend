import React, {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const ItemInfo = (props) => {
    const [data, setData] = useState();
    const [columnDefs, setColumnDefs] = useState<any>();
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

    useEffect(() => {
        if (props.query === 'employees') {
            fetch(`${process.env.REACT_APP_URL}/employees/${props.details.employeeID}/holidays`)
            .then(result => result.json())
            .then(data => {
                setData(data);
                setColumnDefs([
                    {field: 'dateFrom'},
                    {field: 'dateTo'}
                ]);
            })
        }
      }, [props.details]);
      console.log(props.details)

    return (
    <Box sx={{flex: 6, marginLeft: 10}}>
        <Typography variant='h6' gutterBottom sx={{marginTop: 0.6}}>
            Details
        </Typography>
        <Grid container spacing={3}>
            {Object.keys(props.details).map(key => 
                <Grid item key={key}>
                    <Paper elevation={1} key={key}>
                        {key}: {`${props.details[key]}`}
                    </Paper>
                </Grid>
            )}
        </Grid>
        {props.query === 'employees' ? 
            <Typography variant='h6' gutterBottom sx={{marginTop: 5}}>
                Holidays
            </Typography> : ''
        }
        {data && 
        <div className='ag-theme-material'>
            <AgGridReact
            className='data'
            domLayout='autoHeight'
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            />
        </div>  
        }
        <Tooltip title='Delete item from database'>
            <IconButton sx={{marginTop: 5}}>
                <DeleteOutlinedIcon sx={{color: 'red', fontSize: 40}}/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default ItemInfo;