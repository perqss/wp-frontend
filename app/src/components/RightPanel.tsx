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
        // var dataSource = {
        //   rowCount: null,
        //   getRows: (params) => {
        //     setTimeout(function () {
        //       var rowsThisPage = data.slice(params.startRow, params.endRow);
        //       var lastRow = -1;
        //       if (data.length <= params.endRow) {
        //         lastRow = data.length;
        //       }
        //       params.successCallback(rowsThisPage, lastRow);
        //     }, 500);
        //   },
        // };
        
        setData(data)
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
    <div style={{display: 'flex', flexDirection: 'row', width: '100vw'}}>
      {/* <div className="example-header">
        Page Size:
        <select onChange={() => props.onPageSizeChanged()} id="page-size" defaultValue={15}>
          <option value="15">15</option>
          <option value="25">25</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
          <option value="1500">1500</option>
        </select>
      </div> */}
      {data && 
      <div className='ag-theme-material' style={{flex: 4}}>
        <AgGridReact
          className='data'
          domLayout='autoHeight'
          //rowModelType='infinite'
          rowData={data}
          //datasource={data}
          pagination={true}
          paginationPageSize={13}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
          ref={gridRef}
        />
      </div>  
      }
      {isShown && <ItemInfo details={details} setDetails={setDetails} query={props.query} setIsShown={setIsShown} value={props.value} setValue={props.setValue} 
      setOpenUpdateSnackbar={setOpenUpdateSnackbar}/>}
      <Snackbar open={openUpdateSnackbar} autoHideDuration={2000} onClose={() => setOpenUpdateSnackbar(false)}>
          <Alert onClose={() => setOpenUpdateSnackbar(false)} severity='success' variant='filled'> 
                Successfully updated database
          </Alert>
      </Snackbar>
    </div>
  )
}

export default RightPanel;