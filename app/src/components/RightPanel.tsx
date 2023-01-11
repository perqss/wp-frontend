import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ItemInfo from './ItemInfo';

const RightPanel = (props) => {
  const [data, setData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [columnDefs, setColumnDefs] = useState();
  const gridRef = useRef<any>(null);
  const [details, setDetails] = useState([]);
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
      fetch(`${process.env.REACT_APP_URL}/${props.query}`)
      .then(result => result.json())
      .then(data => {
        setData(data);
        setColumnDefs(props.columnDefs);
        setIsShown(false);
      })
  }, [props.query]);

  const onRowSelected = () => {
    var selectedRows = gridRef.current.api.getSelectedRows();
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
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={'single'}
          onRowSelected={onRowSelected}
          ref={gridRef}
        />
      </div>  
      }
      {isShown && <ItemInfo details={details} query={props.query}/>}
    </div>
  )
}

export default RightPanel;