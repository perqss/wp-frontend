import React, { useEffect, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AllCommunityModules } from "@ag-grid-community/all-modules";

const RightPanel = (props) => {
  const [data, setData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(props.columnDefs);
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
      .then(data => setData(data))
  }, [])

  return (
    <div>
      {data && 
      <div className='ag-theme-material' style={{ height: 400, width: 600 }}>
        <AgGridReact
          modules={AllCommunityModules}
          className='data'
          domLayout='autoHeight'
          rowData={data}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>  
      }
    </div>
  )
}

export default RightPanel;