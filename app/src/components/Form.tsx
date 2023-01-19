import React, { useEffect, useState } from 'react';
import Employee from '../models/Employee';
import Building from '../models/Building';
import Ticket from '../models/Ticket';
import AirReading from '../models/AirReading';
import { Alert, Box, Button, TextField, Grid } from '@mui/material';
import {FormTextField, FormBox, FormButton, StyledAlert} from './MaterialComponentsCss';

const Form = (props) => {
  const [values, setValues] = useState<any>();
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
    let it;
    if (!props.add) {
      let object = props.objectToUpdate;
      switch (props.query) {
        case 'employees':
          it = new Employee(object.employeeID, object.pesel, object.firstName, object.lastName, object.gender, object.birthDate,
              object.hireDate, object.phoneNumber, object.address, object.city, object.departmentID);
          break;
        case 'buildings':
          it = new Building(object.buildingId, object.buildingName, object.address);
          break;
        case 'tickets':
          it = new Ticket(object.ticketId, object.name, object.price, object.periodic);
          break;
      }
    } else {
      switch (props.query) {
        case 'employees':
          it = new Employee();
          break;
        case 'buildings':
          it = new Building();
          break;
        case 'air readings':
          it = new AirReading();
          break;
        case 'tickets':
          it = new Ticket();
          break;
      }
    }
    setValues(it);
  }, [props.query]);

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
    let {name, value, checked, type} = e.target;

    if (name === 'periodic') {
      value = checked;
    } else if (type === 'number') {
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
        <FormBox>
          {props.add &&
              <FormTextField
                  variant='outlined'
                  name="pesel"
                  label='Pesel'
                  type='number'
                  value={values.pesel}
                  onChange={handleInputChange}/>
          }
          <FormTextField
              variant='outlined'
              name="firstName"
              label='First Name'
              type='text'
              value={values.firstName}
              onChange={handleInputChange}
          />
          <FormTextField
              variant='outlined'
              name="lastName"
              label='Last Name'
              type='text'
              value={values.lastName}
              onChange={handleInputChange}
          />
          <FormTextField
              variant='outlined'
              name="gender"
              label='Gender'
              type='text'
              value={values.gender}
              onChange={handleInputChange}
          />
          {props.add &&
              <FormTextField
                  variant='outlined'
                  label='Birth Date'
                  name="birthDate"
                  InputLabelProps={{shrink: true}}
                  type='date'
                  value={values.firstDate}
                  onChange={handleInputChange}
              />
          }
          {props.add &&
              <FormTextField
                  variant='outlined'
                  label='Hire Date'
                  name="hireDate"
                  InputLabelProps={{shrink: true}}
                  type='date' value={values.hireDate}
                  onChange={handleInputChange}
              />
          }
          <FormTextField
              variant='outlined'
              name="phoneNumber"
              label='Phone Number'
              value={values.phoneNumber}
              onChange={handleInputChange}
          />
          <FormTextField
              variant='outlined'
              name="city"
              label='City'
              value={values.city}
              onChange={handleInputChange}
          />
          <FormTextField
              variant='outlined'
              name="address"
              label='Address'
              value={values.address}
              onChange={handleInputChange}
          />
          {props.add &&
              <FormTextField
                  variant='outlined'
                  name="departmentID"
                  label='Department ID'
                  value={values.departmentID}
                  onChange={handleInputChange}
              />
          }
          <FormButton
              onClick={handleUpdate}
              variant='contained'
          >
            {props.add ? <div>Add Employee</div> : <div>Update Employee</div>}
          </FormButton>
          {errors && [...errors].map((error, id) =>
              <StyledAlert
                  variant='filled'
                  severity='error'
                  key={id}
              >
                {error}
              </StyledAlert>
          )}
        </FormBox>
      );
    } else if (props.query === 'buildings') {
      return (
        <FormBox>
            <FormTextField
                variant='outlined'
                name="buildingName"
                label='Building Name'
                value={values.buildingName}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="address"
                label='Address'
                value={values.address}
                onChange={handleInputChange}
            />
            <FormButton
                onClick={handleUpdate}
                variant='contained'
            >
              {props.add ? <div>Add Building</div> : <div>Update Building</div>}
            </FormButton>
            {errors && [...errors].map((error, id) =>
                <StyledAlert
                    variant='filled'
                    severity='error'
                    key={id}
                >
                  {error}
                </StyledAlert>
            )}
        </FormBox>
      );
    } else if (props.query === 'tickets') {
      return(
        <FormBox>
            <FormTextField
                variant='outlined'
                name="name"
                label='Ticket Name'
                type='text'
                value={values.name}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="price"
                label='Ticket Price'
                type='number'
                inputProps={{
                  step: '0.01'
                }}
                value={values.price}
                onChange={handleInputChange}
            />
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{marginTop: 7, marginRight: 5}}>Is Periodic</div>
                <input
                    name='periodic'
                    id='periodic'
                    type='checkbox'
                    value={values.periodic}
                    checked={values.periodic}
                    onChange={handleInputChange}
                    style={{marginTop: 13}}
                />
            </div>
            <FormButton
                onClick={handleUpdate}
                variant='contained'
            >
              {props.add ? <div>Add Ticket</div> : <div>Update Ticket</div>}
            </FormButton>
            {errors && [...errors].map((error, id) =>
                <StyledAlert
                    variant='filled'
                    severity='error'
                    key={id}
                >
                  {error}
                </StyledAlert>
            )}
        </FormBox>
      );
    } else if (props.query === 'air readings') {
      return(
        <FormBox>
            <FormTextField
                variant='outlined'
                name="airReadingDate"
                label='Air Reading Date'
                type='date'
                value={values.airReadingDate}
                onChange={handleInputChange}
                InputLabelProps={{shrink: true}}
            />
            <FormTextField
                variant='outlined'
                name="PM10"
                label='PM10'
                value={values.PM10}
                type='number'
                inputProps={{
                  step: 'any'
                }}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="SO2"
                label='SO2'
                value={values.SO2}
                type='number'
                inputProps={{
                  step: 'any'
                }}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="PM25"
                label='PM25'
                value={values.PM5}
                type='number'
                inputProps={{
                  step: 'any'
                }}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="NO2"
                label='NO2'
                value={values.NO2}
                type='number'
                inputProps={{
                  step: 'any'
                }}
                onChange={handleInputChange}
            />
            <FormTextField
                variant='outlined'
                name="O3"
                label='O3'
                value={values.O3}
                type='number'
                inputProps={{
                  step: 'any'
                }}
                onChange={handleInputChange}
            />
            <FormButton
                onClick={handleUpdate}
                variant='contained'
            >
              Add Air Reading
            </FormButton>
            {errors && [...errors].map((error, id) =>
                <StyledAlert
                    variant='filled'
                    severity='error'
                    key={id}
                >
                  {error}
                </StyledAlert>
            )}
        </FormBox>
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