import React, {useEffect, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import ItemInfo from './ItemInfo';
import {Alert, Snackbar} from '@mui/material';
import {fetchEmployees} from '../clients/EmployeesClient';
import {fetchAirReadings} from '../clients/AirReadingsClient';
import {fetchBuildings} from '../clients/BuildingsClient';
import {fetchStops} from '../clients/StopsClient';
import {fetchTickets} from '../clients/TicketsClient';
import {fetchBusLines} from '../clients/BusLinesClient';
import {fetchTramLines} from '../clients/TramLinesClient';
import {fetchVehicles} from '../clients/VehiclesClient';
import { CategoryEnum } from './LeftPanel';
import { Table } from './LeftPanel';
 
const RightPanel = (props: {
    className: string;
    query: string;
    columnDefs: Table[];  
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    openAddSnackbar: boolean,
    setOpenAddSnackbar: React.Dispatch<React.SetStateAction<boolean>>,
    snackbarAddMessage: string,
    setSnackbarAddMessage: React.Dispatch<React.SetStateAction<string>>,
  }) => {
  const [data, setData] = useState<any>();
  const [isShown, setIsShown] = useState<boolean>(false);
  const [columnDefs, setColumnDefs] = useState<Table[]>([]);
  const [openUpdateSnackbar, setOpenUpdateSnackbar] = useState<boolean>(false);
  const [snackbarUpdateMessage, setSnackbarUpdateMessage] = useState<string>('');
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState<boolean>(false);
  const [snackbarDeleteMessage, setSnackbarDeleteMessage] = useState<string>('');
  const gridRef = useRef<any>(null);
  const [details, setDetails] = useState<any>();
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
    fetchData().then(data => {
      setData(data);
      setColumnDefs(props.columnDefs);
      setIsShown(false);
    })
  }, [props.query, props.value]);

  const fetchData = async () => {
    switch (props.query as CategoryEnum) {
      case CategoryEnum.AirReadings:
        return await fetchAirReadings();
      case CategoryEnum.Buildings:
        return await fetchBuildings();
      case CategoryEnum.BusLines:
        return await fetchBusLines();
      case CategoryEnum.Employees:
        return await fetchEmployees();
      case CategoryEnum.Stops:
        return await fetchStops();
      case CategoryEnum.Tickets:
        return await fetchTickets();
      case CategoryEnum.TramLines:
        return await fetchTramLines();
      case CategoryEnum.Vehicles:
        return await fetchVehicles();
    }
  }

  const onRowSelected = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
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
      {isShown && 
      <ItemInfo
          details={details}
          setDetails={setDetails}
          query={props.query}
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
      <Snackbar
          open={props.openAddSnackbar}
          autoHideDuration={2000}
          onClose={() => props.setOpenAddSnackbar(false)}
      >
          <Alert
              onClose={() => props.setOpenAddSnackbar(false)}
              severity='success'
              variant='filled'
          >
              {props.snackbarAddMessage}
          </Alert>
      </Snackbar>
    </div>
  )
}

export default RightPanel;