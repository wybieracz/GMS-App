import { ArrowRight } from '@carbon/icons-react';
import { Button, ButtonSet, Column, Grid, Layer, Stack, TextInput, Tile } from '@carbon/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultInvalidData, defaultRegisterData } from '../../consts/registerPage';
import NotificationContext from '../../context/NotificationContext';
import { checkEmail, checkPassword, handleRegister } from './RegisterPageUtils';

const RegisterPage = () => {

  const navigate = useNavigate();
  const notifications = useContext(NotificationContext);
  const [data, setData] = useState(defaultRegisterData);
  const [invalid, setInvalid] = useState(defaultInvalidData);

  useEffect(() => {
    if(invalid.sent) {
      if(data.name) setInvalid(prevInvalid => { return { ...prevInvalid, name: false }})
      else setInvalid(prevInvalid => { return { ...prevInvalid, name: true }})
    }
  }, [invalid.sent, data.name])

  useEffect(() => {
    if(invalid.sent) {
      if(data.surname) setInvalid(prevInvalid => { return { ...prevInvalid, surname: false }})
      else setInvalid(prevInvalid => { return { ...prevInvalid, surname: true }})
    }
  }, [invalid.sent, data.surname])

  useEffect(() => {
    if(invalid.sent) {
      if(checkEmail(data.email)) setInvalid(prevInvalid => { return { ...prevInvalid, email: false }})
      else setInvalid(prevInvalid => { return { ...prevInvalid, email: true }})
    }
  }, [invalid.sent, data.email])

  useEffect(() => {
    if(invalid.sent) {
      if(checkPassword(data.password)) setInvalid(prevInvalid => { return { ...prevInvalid, password: false }})
      else setInvalid(prevInvalid => { return { ...prevInvalid, password: true }})
    }
  }, [invalid.sent, data.password])

  return(
    <Grid>
      <Column lg={5} md={2} sm={0} />
      <Column lg={6} md={4} sm={4}>
        <Tile className='register-page__tile'>
          <div className='register-page__content'>
            <h3>Create account</h3>
            <Layer>
              <Stack gap={6}>
                <TextInput
                  id='input-name'
                  type="text"
                  labelText="Name"
                  invalidText='Name cannot be empty.'
                  invalid={invalid.name}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value})}
                />
                <TextInput
                  id='input-surname'
                  type="text"
                  labelText="Surname"
                  invalidText='Surname cannot be empty.'
                  invalid={invalid.surname}
                  value={data.surname}
                  onChange={(e) => setData({ ...data, surname: e.target.value})}
                />
                <TextInput
                  id='input-email'
                  type="text"
                  labelText="Email"
                  invalidText='Invalid email address.'
                  invalid={invalid.email}
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value})}
                />
                <TextInput
                  id='input-password'
                  type="password"
                  labelText="Password"
                  invalidText='The password should have 8 or more characters including lowercase and uppercase letters, a number and a special character.'
                  invalid={invalid.password}
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value})}
                />
              </Stack>
            </Layer>
          </div>
          <ButtonSet className='register-page__button_set'>
            <Button className='register-page__button'
              kind='ghost'
              size='xl' 
              onClick={() => navigate('/login')}
            >
              Back
            </Button>
            <Button className='register-page__button'
              kind='primary'
              size='xl'
              renderIcon={ArrowRight}
              iconDescription='Arrow right'
              disabled={invalid.name || invalid.surname || invalid.email || invalid.password}
              onClick={() => { 
                setInvalid({ ...invalid, sent: true})
                handleRegister(data, navigate, notifications)
              }}
            >
              Continue
            </Button>
          </ButtonSet>
        </Tile>
      </Column>
      <Column lg={5} md={2} sm={0} />
    </Grid>
  )
}

export default RegisterPage