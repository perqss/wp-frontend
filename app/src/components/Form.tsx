import React, { useEffect, useState } from 'react';
import Employee from '../models/Employee';
import Building from '../models/Building';
import Ticket from '../models/Ticket';
import AirReading from '../models/AirReading';
import { Alert, Box, Button, TextField, Grid } from '@mui/material';
import FormTextField from './FormTextField';

const Form = (props) => {
  const [values, setValues] = useState<any>();
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    if (!props.add) {
      let object = props.objectToUpdate;
      if (props.query === 'employees') {
        let employee = new Employee(object.employeeID, object.pesel, object.firstName, object.lastName, object.gender, object.birthDate, 
        object.hireDate, object.phoneNumber, object.address, object.city, object.departmentID);
        setValues(employee);
      } else if (props.query === 'buildings') {
        let building = new Building(object.buildingId, object.buildingName, object.address);
        setValues(building);
      } else if (props.query === 'tickets') {
        console.log(object.periodic)
        let ticket = new Ticket(object.ticketId, object.name, object.price, object.periodic);
        setValues(ticket);
      }
    } else {
      if (props.query === 'employees') {
        let employee = new Employee();
        setValues(employee);
      } else if (props.query === 'buildings') {
        let building = new Building();
        setValues(building);
      } else if (props.query === 'air readings') {
        let airReading = new AirReading();
        setValues(airReading);
      } else if (props.query === 'tickets') {
        let ticket = new Ticket();
        setValues(ticket);
      }
    }
  }, [props.query]);

  // useEffect(() => {
  //   if (errors) {
  //     console.log('nosz kurwa')
  //     props.setValue(props.value + 1);
  //   }
  // }, [errors]);


  const handleUpdate = async () => {
    var url = `${process.env.REACT_APP_URL}/`;
    props.query === 'air readings' ? url += 'airReadings' : url += `${props.query}`;
    if (!props.add) {
      if (props.query === 'employees') {
        url += `/${props.objectToUpdate.employeeID}`;
      } else if (props.query === 'buildings') {
        url += `/${props.objectToUpdate.buildingId}`;
      } else if (props.query === 'tickets') {
        url += `/${props.objectToUpdate.ticketId}`;
        // var isTrueSet = (values.periodic === 'true');
        // isTrueSet ? values.periodic = true : values.periodic = false;
      }

      await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          return response.json();
        } else {
          props.setOpenUpdateSnackbar(true);
          props.setSnackbarUpdateMessage(`Successfully updated ${props.query.substr(0, props.query.length - 1)}`);
          props.setUpdateFormOpen(false);
          return null;
        }
      })
      .then(responseErrors => {
        if (responseErrors) {
          setErrors(new Set(responseErrors))
        } else {
          props.setValue(props.value + 1);
        }
      });
    } else {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then(response => {
        if (response.status < 200 || response.status > 299) {
          return response.json();
        } else {
          props.setOpenAddSnackbar(true);
          props.setSnackbarAddMessage(`Successfully added ${props.query.substr(0, props.query.length - 1)}`);
          props.setAddFormOpen(false);
          return null;
        }
      })
      .then(responseErrors => {
        if (responseErrors) {
          setErrors(new Set(responseErrors))
        } else {
          props.setValue(props.value + 1);
        }
      })
    }
  };

  const handleInputChange = (e) => {
    let {name, value, checked} = e.target;
    // console.log(typeof value)
    // console.log(e.target.checked)
     //console.log(parseFloat(value))
    // console.log(typeof value === 'string')
    if (name === 'periodic') {
      value = checked;
    } else if (!name.includes('Date') && value !== '' && !isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }

    setValues({
      ...values,
      [name]: value,
    });
  };

  const renderFields = () => {
    if (props.query === 'employees') {
      return (
        <Box sx={{top: '50%', left: '50%', width: 400, p: 2, boxShadow: 24, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', flexDirection: 'column'}}>
          {props.add && <FormTextField variant='outlined' name="pesel" label='Pesel' type='number' value={values.pesel} onChange={handleInputChange}/>}
          <FormTextField variant='outlined' name="firstName" label='First Name' type='text' value={values.firstName} onChange={handleInputChange}/>
          <FormTextField variant='outlined' name="lastName" label='Last Name' type='text' value={values.lastName} onChange={handleInputChange} sx={{marginTop: 1}}/>
          <FormTextField variant='outlined' name="gender" label='Gender' type='text' value={values.gender} onChange={handleInputChange} sx={{marginTop: 1}}/>
          {props.add && <FormTextField variant='outlined' label='Birth Date' name="birthDate" InputLabelProps={{shrink: true}} type='date' value={values.firstDate} onChange={handleInputChange} sx={{marginTop: 1}}/>}
          {props.add && <FormTextField variant='outlined' label='Hire Date' name="hireDate" InputLabelProps={{shrink: true}} type='date' value={values.hireDate} onChange={handleInputChange} sx={{marginTop: 1}}/>}
          <FormTextField variant='outlined' name="phoneNumber" label='Phone Number' value={values.phoneNumber} onChange={handleInputChange} sx={{marginTop: 1}}/>
          <FormTextField variant='outlined' name="city" label='City' value={values.city} onChange={handleInputChange} sx={{marginTop: 1}}/>
          <FormTextField variant='outlined' name="address" label='Address' value={values.address} onChange={handleInputChange} sx={{marginTop: 1}}/>
          {props.add && <FormTextField variant='outlined' name="departmentID" label='Department ID' value={values.departmentID} onChange={handleInputChange} sx={{marginTop: 1}}/>}
          <Button onClick={handleUpdate} variant='contained' sx={{marginTop: 1, backgroundColor: '#0c2d64'}}>
            {props.add ? <div>Add Employee</div> : <div>Update Employee</div>}
          </Button>
          {errors && [...errors].map((error, id) => <Alert variant='filled' severity='error' key={id} sx={{width: 142, marginTop: 1}}>{error}</Alert>)}
        </Box>
      );
    } else if (props.query === 'buildings') {
      return (
        <Box sx={{top: '50%', left: '50%', width: 400, p: 2, boxShadow: 24, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', 
          justifyContent: 'center', flexDirection: 'column'}}>
            <FormTextField variant='outlined' name="buildingName" label='Building Name' value={values.buildingName} onChange={handleInputChange}/>
            <FormTextField variant='outlined' name="address" label='Address' value={values.address} onChange={handleInputChange} sx={{marginTop: 1}}/>
            <Button onClick={handleUpdate} variant='contained' sx={{marginTop: 1, backgroundColor: '#0c2d64'}}>
              {props.add ? <div>Add Building</div> : <div>Update Building</div>}
            </Button>
            {errors && [...errors].map((error, id) => <Alert variant='filled' severity='error' key={id} sx={{width: 142, marginTop: 1}}>{error}</Alert>)}
        </Box>
      );
    } else if (props.query === 'tickets') {
      return(
        <Box sx={{top: '50%', left: '50%', width: 400, p: 2, boxShadow: 24, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', flexDirection: 'column'}}>
            <FormTextField variant='outlined' name="name" label='Ticket Name' type='text' value={values.name} onChange={handleInputChange}/>
            <FormTextField variant='outlined' name="price" label='Ticket Price' type='number' value={values.price} onChange={handleInputChange} sx={{marginTop: 1}}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: 7, marginRight: 5}}>Is Periodic</div>
                <input name='periodic' id='periodic' type='checkbox' value={values.periodic} checked={values.periodic} onChange={handleInputChange} style={{marginTop: 13}}/>
            </div>
            <Button onClick={handleUpdate} variant='contained' sx={{marginTop: 1, backgroundColor: '#0c2d64'}}>
              {props.add ? <div>Add Ticket</div> : <div>Update Ticket</div>}
            </Button>
            {errors && [...errors].map((error, id) => <Alert variant='filled' severity='error' key={id} sx={{width: 142, marginTop: 1}}>{error}</Alert>)}
        </Box>
      );
    } else if (props.query === 'air readings') {
      return(
        <Box sx={{top: '50%', left: '50%', width: 400, p: 2, boxShadow: 24, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', flexDirection: 'column'}}>
            <FormTextField variant='outlined' name="airReadingDate" label='Air Reading Date' type='date' value={values.airReadingDate} onChange={handleInputChange}
            InputLabelProps={{shrink: true}}/>
            <FormTextField variant='outlined' name="pm10" label='PM10' value={values.pm10} type='number' onChange={handleInputChange} sx={{marginTop: 1}}/>
            <FormTextField variant='outlined' name="so2" label='SO2' value={values.so2} type='number' onChange={handleInputChange} sx={{marginTop: 1}}/>
            <FormTextField variant='outlined' name="pm25" label='PM25' value={values.pm25} type='number' onChange={handleInputChange} sx={{marginTop: 1}}/>
            <FormTextField variant='outlined' name="no2" label='NO2' value={values.no2} type='number' onChange={handleInputChange} sx={{marginTop: 1}}/>
            <FormTextField variant='outlined' name="o3" label='O3' value={values.o3} type='number' onChange={handleInputChange} sx={{marginTop: 1}}/>
            <Button onClick={handleUpdate} variant='contained' sx={{marginTop: 1, backgroundColor: '#0c2d64'}}>Add Air Reading</Button>
            {errors && [...errors].map((error, id) => <Alert variant='filled' severity='error' key={id} sx={{width: 142, marginTop: 1}}>{error}</Alert>)}
        </Box>
      );
    }
  };

  return (
    <div>
      {values && renderFields()}
    </div>
  );
};

export default Form;