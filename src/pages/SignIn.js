import React, { useState } from 'react'
import { Form, Button, Input, Panel, Stack, Divider } from 'rsuite'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function SignIn() {
  const visible = false
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const axiosPostData = async() => {
    const regEmail = email
    const regPassword = password

    await axios.post('http://localhost:4000/sign-in', {regEmail, regPassword}, {headers: {'Content-Type': 'application/json'}})
    .then(res => {
      if(res.data.validation){
        window.location.reload()
        sessionStorage.setItem('token', res.data.rows[0].PROFILE_ID)
      }else{
        alert('No such Email/Password exists.')
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log('Variables received: ' + email + ' | ' + password)

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
          <span>Dont have an account?</span>
          <Link to="/sign-up"> Create an Account</Link>
        </p>

        <Divider>OR</Divider>

        <Form fluid>
          <Form.Group controlId="email">
            <Form.ControlLabel>Email Address</Form.ControlLabel>
            <Input value={email} type="text" id="email" name="email" onChange={setEmail}/>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.ControlLabel>Password</Form.ControlLabel>
              <Input type={visible ? "text" : "password"} value={password} id="password" name="password" onChange={setPassword}/>
          </Form.Group>

          <Form.Group>
            <Stack spacing={6}>
              <Button appearance="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Stack>
          </Form.Group>
        </Form>
      </Panel>
    </Stack>
  )
}