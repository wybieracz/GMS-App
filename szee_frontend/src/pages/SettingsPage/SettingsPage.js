import { Save } from '@carbon/icons-react';
import { Button, Column, Grid, Stack, TextInput } from '@carbon/react';
import React, { useContext, useState } from 'react';
import NotificationContext from '../../context/NotificationContext';
import { checkPassword } from '../RegisterPage/RegisterPageUtils';
import { handlePasswordChange } from './SettingsPageUtils';

const SettingsPage = ({ user, sessionExpired }) => {

  const notifications = useContext(NotificationContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [begin, setBegin] = useState(false);

  function resetInputs() {
    setOldPassword("")
    setNewPassword("")
    setNewPasswordRepeat("")
    setBegin(false)
  }

  return (
    <Grid className='settings-page'>
      <Column lg={16} md={8} sm={4} className='settings-page__content'>
        <div className='settings-page__title'>
          <h1>Settings</h1>
        </div>
        <Grid className='settings-page'>
          <Column lg={6} md={6} sm={4} className='settings-page'>
            <Stack gap={7}>
              <TextInput
                id="text-input-password-old"
                type="password"
                labelText="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={!user.loaded}
              />
              <TextInput
                id="text-input-password-new"
                type="password"
                labelText="New password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setBegin(true);
                }}
                invalidText='The password should have 8 or more characters including lowercase and uppercase letters, a number and a special character.'
                invalid={!checkPassword(newPassword) && begin}
                disabled={!user.loaded}
              />
              <TextInput
                id="text-input-password-repeat"
                type="password"
                labelText="Repeat password"
                value={newPasswordRepeat}
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                invalidText='Passwords must match.'
                invalid={newPassword !== newPasswordRepeat}
                disabled={!user.loaded}
              />
              <Button 
                kind='primary'
                renderIcon={Save}
                onClick={() => handlePasswordChange(oldPassword, newPassword, resetInputs, sessionExpired, notifications)}
                disabled={!checkPassword(newPassword) || !begin || newPassword !== newPasswordRepeat}
              >
                Save
              </Button>
            </Stack>
          </Column>
        </Grid>
        </Column>
    </Grid>
  )
}

export default SettingsPage