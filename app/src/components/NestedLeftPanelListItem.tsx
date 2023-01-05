import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';

const NestedLeftPanelListItem = (props) => {
  return (
    <ListItem disablePadding sx={{pl: 4}}>
        <ListItemButton>
            <ListItemText primary={props.text} primaryTypographyProps={{fontSize: 'medium'}}/>
        </ListItemButton>
    </ListItem>
  )
}

export default NestedLeftPanelListItem;