import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ItemInfo from './ItemInfo';
import { Alert, Snackbar, Select, MenuItem } from '@mui/material';

const RightPanel = (props) => {
  const [data, setData] = useState<any>();
  const [isShown, setIsShown] = useState(false);
  const [columnDefs, setColumnDefs] = useState();
  const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState(false);
  const [snackbarUpdateMessage, setSnackbarUpdateMessage] = useState();
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [snackbarDeleteMessage, setSnackbarDeleteMessage] = useState('');
  const gridRef = useRef<any>(null);
  const [details, setDetails] = useState();
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
    var url;
    if (props.query !== 'tickets') {
      url = `${process.env.REACT_APP_URL}/${props.query}?limit=1000000&beforeId=0`
    } else {
      url = `${process.env.REACT_APP_URL}/${props.query}`;
    }
      fetch(url)
      .then(result => result.json())
      .then(data => {
        setData(data);
        setColumnDefs(props.columnDefs);
        setIsShown(false);
      })
  }, [props.query, props.value]);

  const onRowSelected = () => {
    var selectedRows = gridRef.current.api.getSelectedRows();
    setDetails(selectedRows[0]);
    setIsShown(true);
  };

  return (
    <div className='right-panel'>
      {data && 
      <div className='ag-theme-material' style={{flex: 4}}>
        <AgGridReact
          className='data'
          domLayout='autoHeight'
          rowData={data}
          pagination={true}
          paginationPageSize={15}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
          ref={gridRef}
        />
      </div>  
      }
      {isShown && <ItemInfo
          details={details}
          setDetails={setDetails}
          query={props.query}
          setIsShown={setIsShown}
          value={props.value}
          setValue={props.setValue}
          setOpenUpdateSnackbar={setOpenUpdateSnackbar}
          setSnackbarUpdateMessage={setSnackbarUpdateMessage}
          setOpenDeleteSnackbar={setOpenDeleteSnackbar}
          setSnackbarDeleteMessage={setSnackbarDeleteMessage}
      />
      }
      <Snackbar
          open={openUpdateSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenUpdateSnackbar(false)}
      >
        <Alert
            onClose={() => setOpenUpdateSnackbar(false)}
            severity='success'
            variant='filled'>
                {snackbarUpdateMessage}
          </Alert>
      </Snackbar>
      <Snackbar
          open={openDeleteSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenDeleteSnackbar(false)}
      >
          <Alert
              onClose={() => setOpenDeleteSnackbar(false)}
              severity='success'
              variant='filled'>
                {snackbarDeleteMessage}
          </Alert>
      </Snackbar>
    </div>
  )
}

export default RightPanel;