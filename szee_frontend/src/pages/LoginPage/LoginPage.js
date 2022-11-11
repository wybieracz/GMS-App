import { Login } from '@carbon/icons-react';
import { Button, ButtonSet, Column, Grid, Layer, Stack, TextInput, Tile } from '@carbon/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { defaultCredentails } from '../../consts/loginPage';
import { handleEmailChange, handleLogin, handlePasswordChange } from './LoginPageUtils';

const LoginPage = ({ setUser }) => {

  const navigate = useNavigate();
  const [credentials, setCredentials] = useState(defaultCredentails);
  const [invalid, setInvalid] = useState(false);

  return(
    <Grid>
      <Column lg={5} md={2} sm={0} />
      <Column lg={6} md={4} sm={4}>
        <Tile className='login-page__tile'>
          <div className='login-page__content'>
            <h3>Log in</h3>
            <Layer>
              <Stack gap={6}>
                <TextInput
                  id='input-email'
                  type='text'
                  labelText='Email'
                  invalid={invalid}
                  value={credentials.email}
                  onChange={(e) => handleEmailChange(e.target.value, credentials, setCredentials, setInvalid)}
                />
                <TextInput
                  id='input-password'
                  type='password'
                  labelText='Password'
                  invalidText='Unknown e-mail address or password.'
                  invalid={invalid}
                  value={credentials.password}
                  onChange={(e) => handlePasswordChange(e.target.value, credentials, setCredentials, setInvalid)}
                />
              </Stack>
            </Layer>
          </div>
          <ButtonSet className='login-page__button_set'>
            <Button className='login-page__button'
              kind='ghost'
              size='xl'
              onClick={() => navigate('/register')}>
              Create account
            </Button>
            <Button className='login-page__button'
              kind='primary'
              size='xl'
              renderIcon={Login}
              iconDescription='Login'
              disabled={invalid}
              onClick={() => handleLogin(credentials, setInvalid, navigate, setUser)}
              >
              Login
            </Button>
          </ButtonSet>
        </Tile>
      </Column>
      <Column lg={5} md={2} sm={0} />
    </Grid>
  )
}

export default LoginPage