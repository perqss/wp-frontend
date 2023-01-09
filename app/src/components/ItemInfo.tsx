import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const ItemInfo = (props) => {
    
  return (
    <Box sx={{flex: 6, marginLeft: 10}}>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Typography variant='h6' gutterBottom sx={{marginTop: 0.6}}>
                Details
            </Typography>
        </Box>
        <Grid container spacing={3}>
            {Object.keys(props.details).map(key =>
            <Grid item>
                <Paper elevation={1} key={key}>
                    {key}: {props.details[key]}
                </Paper>
            </Grid>
            )}
        </Grid>
        <Tooltip title='Delete item from database'>
            <IconButton sx={{marginTop: 5}}>
                <DeleteOutlinedIcon sx={{color: 'red', fontSize: 40}}/>
            </IconButton>
        </Tooltip>
    </Box>
  )
}

export default ItemInfo;