import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ItemInfo from './ItemInfo';
import { Alert, Snackbar } from '@mui/material';

const RightPanel = (props) => {
  const [data, setData] = useState<any>();
  const [value, setValue] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [columnDefs, setColumnDefs] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
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
    if (props.query !== 'vehicles') {
      fetch(`${process.env.REACT_APP_URL}/${props.query}`)
      .then(result => result.json())
      .then(data => {
        var dataSource = {
          rowCount: null,
          getRows: (params) => {
            setTimeout(function () {
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        
        setData(dataSource)
        setColumnDefs(props.columnDefs);
        setIsShown(false);
      })
  }
  }, [props.query, value]);

  const onRowSelected = () => {
    var selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows[0])
    setDetails(selectedRows[0]);
    setIsShown(true);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
      {data && 
      <div className='ag-theme-material' style={{flex: 4}}>
        <AgGridReact
          className='data'
          domLayout='autoHeight'
          rowModelType='infinite'
          //rowData={data}
          datasource={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
          ref={gridRef}
        />
      </div>  
      }
      {isShown && <ItemInfo details={details} setDetails={setDetails} query={props.query} setIsShown={setIsShown} value={value} setValue={setValue} 
      setOpenSnackbar={setOpenSnackbar}/>}
      <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={() => setOpenSnackbar(false)}>
          <Alert onClose={() => setOpenSnackbar(false)} severity='success' variant='filled'> 
                Successfully updated database
          </Alert>
      </Snackbar>
    </div>
  )
}

export default RightPanel;