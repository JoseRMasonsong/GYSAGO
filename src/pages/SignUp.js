import React, { useState } from 'react';
import { Form, Button, Input, Panel, Stack, Checkbox, Divider } from 'rsuite';
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function SignUp() {
  const visible = React.useState(false)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  const axiosPostData = async() => {
    const regFirstName = firstname
    const regLastName = lastname
    const regEmail = email
    const regPassword = password
    const regCPassword = cpassword

    await axios.post('http://localhost:4000/sign-up', {regFirstName, regLastName, regEmail, regPassword, regCPassword}, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        alert('Account created successfully')
        window.location.reload()
      }else{
        alert('Email Address is already being used.')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Variables received: ' + firstname + ' | ' + lastname + ' | ' + email + ' | ' + password + ' | ' + cpassword)

    axiosPostData()
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
        header={<h3>Create an Account</h3>}
        bordered
        style={{ background: '#fff', width: 400 }}
      >
        <p>
          <span>Already have an account?</span>
          <Link to="/sign-in"> Sign in here</Link>
        </p>

        <Divider>OR</Divider>

        <Form fluid>
          <Form.Group controlId="firstname">
            <Form.ControlLabel>First Name</Form.ControlLabel>
            <Input value={firstname} type="text" id="firstname" name="firstname" onChange={setFirstName}/>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.ControlLabel>Last Name</Form.ControlLabel>
            <Input value={lastname} type="text" id="lastname" name="lastname" onChange={setLastName}/>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.ControlLabel>Email</Form.ControlLabel>
            <Input value={email} type="text" id="email" name="email" onChange={setEmail}/>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
              <Input type={visible ? "text" : "password"} value={password} id="password" name="password" onChange={setPassword}/>
          </Form.Group>

          <Form.Group controlId="cpassword">
            <Form.ControlLabel>Confirm Password</Form.ControlLabel>
              <Input type={visible ? "text" : "password"} value={cpassword} id="cpassword" name="cpassword" onChange={setCPassword}/>
          </Form.Group>

          <Form.Group>
            <Stack style={{ marginLeft: -10 }}>
              <Checkbox>I Agree</Checkbox>
              <Button appearance="link">Terms and conditions.</Button>
            </Stack>
          </Form.Group>

          <Form.Group>
            <Stack spacing={6}>
              <Button appearance="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  );
};

