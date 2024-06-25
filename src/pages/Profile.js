import React, { useState, useEffect } from 'react'
import { Form, Button, Input, Panel, Stack } from 'rsuite'
import axios from 'axios'

export default function Profile() {
  const [defFirstName, setdefFirstName] = useState('')
  const [defLastName, setdefLastName] = useState('')
  const [defEmail, setdefEmail] = useState('')
  const [defPhone, setdefPhone] = useState('')
  const [defAddress, setdefAddress] = useState('')
  const [defState, setdefState] = useState('')
  const [defCity, setdefCity] = useState('')
  const [defZip, setdefZip] = useState('')

  /* const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('') */
  
  const profileID = sessionStorage.getItem('token')

  const axiosPostProfile = async() => {

    await axios.post('http://localhost:4000/get-profile', {profileID}, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        setdefFirstName(res.data.rows[0].FIRST)
        setdefLastName(res.data.rows[0].LAST)
        setdefEmail(res.data.rows[0].EMAIL)
        setdefPhone(res.data.rows[0].PHONE)
        setdefAddress(res.data.rows[0].ADDRESS)
        setdefState(res.data.rows[0].STATE)
        setdefCity(res.data.rows[0].CITY)
        setdefZip(res.data.rows[0].ZIP)
      }else{
        alert('No such Profile Exists.')
      }
    })
  }

  useEffect(() => {
    axiosPostProfile()
  }, [])

  const axiosPostUpdate = async() => {
    const upFirstName = defFirstName
    const upLastName = defLastName
    const upEmail = defEmail
    const upPhone = defPhone
    const upAddress = defAddress
    const upState = defState
    const upCity = defCity
    const upZip = defZip

    await axios.post('http://localhost:4000/update-profile', {profileID, upFirstName, upLastName, upEmail, upPhone, upAddress, upState, upCity, upZip}
    , {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        window.location.reload()
      }else{
        alert('Could not update profile.')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axiosPostUpdate()
  }

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{
        height: '100vh'
      }}
    >
      <Panel
        header={<h3>Profile Information</h3>}
        bordered
        style={{ background: '#fff', width: 400 }}
      >
        <Form fluid>
          <Form.Group controlId="firstname">
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Input value={defFirstName} type="text" id="firstname" name="firstname" onChange={setdefFirstName}/>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Input value={defLastName} type="text" id="lastname" name="lastname" onChange={setdefLastName}/>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Input readOnly value={defEmail} type="text" id="email" name="email" onChange={setdefEmail}/>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.ControlLabel>Phone</Form.ControlLabel>
            <Input value={defPhone} type="text" id="phone" name="phone" onChange={setdefPhone}/>
          </Form.Group>

          <Form.Group controlId="address">
            <Form.ControlLabel>Address</Form.ControlLabel>
            <Input value={defAddress} type="text" id="address" name="address" onChange={setdefAddress}/>
          </Form.Group>

          <Form.Group controlId="state">
            <Form.ControlLabel>State</Form.ControlLabel>
            <Input value={defState} type="text" id="state" name="state" onChange={setdefState}/>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.ControlLabel>City</Form.ControlLabel>
            <Input value={defCity} type="text" id="city" name="city" onChange={setdefCity}/>
          </Form.Group>

          <Form.Group controlId="zip">
            <Form.ControlLabel>Zip</Form.ControlLabel>
            <Input value={defZip} type="text" id="zip" name="zip" onChange={setdefZip}/>
          </Form.Group>

          <Form.Group>
            <Stack spacing={6}>
              <Button appearance="primary" type="submit" onClick={handleSubmit}>Save</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

