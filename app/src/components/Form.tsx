import React, {useEffect, useState} from 'react';
import Employee from '../models/Employee';
import Building from '../models/Building';
import Ticket from '../models/Ticket';
import {FormBox, FormButton, FormTextField, StyledAlert} from './MaterialComponentsCss';
import {CategoryEnum} from "./LeftPanel";
import AirReading from "../models/AirReading";
import {addAirReading} from "../clients/AirReadingsClient";

const Form = (props) => {
  const [values, setValues] = useState<any>();
  const [errors, setErrors] = useState<any>();

  useEffect(() => {
      let it;
      const object = props.objectToUpdate;
      switch (props.query as CategoryEnum) {
        case CategoryEnum.Employees:
          it = props.add ? new Employee()
              : new Employee(object.employeeID, object.pesel, object.firstName, object.lastName, object.gender,
                  object.birthDate, object.hireDate, object.phoneNumber, object.address, object.city, object.departmentID);
          break;
        case CategoryEnum.Buildings:
          it = props.add ? new Building() :
              new Building(object.buildingId, object.buildingName, object.address);
          break;
        case CategoryEnum.Tickets:
          it = props.add ? new Ticket() :
              new Ticket(object.ticketId, object.name, object.price, object.periodic);
          break;
          case CategoryEnum.AirReadings:
              it = props.add ? new AirReading() :
                  new AirReading(object.airReadingDate, object.PM10, object.SO2, object.PM25, object.NO2, object.O3);
              break;
      }
    setValues(it);
  }, [props.query]);

  const handleUpdate = async () => {
     var url = `${process.env.REACT_APP_URL}/`;
    // props.query === 'air readings' ? url += 'airReadings' : url += `${props.query}`;
      console.log(props.add)
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
    }

    else {
        addAirReading(values).then(response => {
                props.setOpenAddSnackbar(true);
                props.setSnackbarAddMessage(`Successfully added ${props.query.substr(0, props.query.length - 1)}`);
                props.setAddFormOpen(false);
                return null;
              })

      // await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(values),
      // })
      // .then(response => {
      //   if (response.status < 200 || response.status > 299) {
      //     return response.json();
      //   } else {
      //     props.setOpenAddSnackbar(true);
      //     props.setSnackbarAddMessage(`Successfully added ${props.query.substr(0, props.query.length - 1)}`);
      //     props.setAddFormOpen(false);
      //     return null;
      //   }
      // })
      // .then(responseErrors => {
      //   if (responseErrors) {
      //     setErrors(new Set(responseErrors))
      //   } else {
      //     props.setValue(props.value + 1);
      //   }
      // })
    }
  };

  const handleInputChange = (e) => {
    let {name, value, checked, type} = e.target;

    if (name === 'periodic') {
      value = checked;
    } else if (type === 'number' && value !== '') {
      value = parseFloat(value);
    } 

    setValues({
      ...values,
      [name]: value,
    });
  };

  const generateErrorMessages = () => {
      [...errors].map((error, id) =>
          <StyledAlert
              variant='filled'
              severity='error'
              key={id}
          >
              {error}
          </StyledAlert>
      )
  }

  const renderFields = () => {
      console.log(props.query)
      switch (props.query) {
          case CategoryEnum.AirReadings:
              return (
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
                          value={values.PM25}
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
                      {errors && generateErrorMessages()}
                  </FormBox>
              )
          case CategoryEnum.Employees:
              return  (
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
                      {errors && generateErrorMessages()}
                  </FormBox>
              );
          case CategoryEnum.Buildings:
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
                      {errors && generateErrorMessages()}
                  </FormBox>
              );
          case CategoryEnum.Tickets:
              return (
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
                      {errors && generateErrorMessages()}
              </FormBox>
          )
      }
  };

  return (
    <div>
      {values && renderFields()}
    </div>
  );
};

export default Form;
