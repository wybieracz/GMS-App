import { Button, Column, Dropdown, Grid, TextInput } from '@carbon/react';
import React, { useState } from 'react';
import { getUnixStamp } from '../../utils/timeFunctions';
import { compareTimeModeRules, getTimeModeInfoString, handleSetMode } from './DeviceModeUtils';
import { Save } from '@carbon/icons-react'

const items = [{ id: 0, label: 'Turn off in' }, { id: 1, label: 'Turn on in' }]

function handleMinutesChange(value, setMinutes) {
  if(value < 0) setMinutes(0)
  else if(value > 59) setMinutes(59)
  else setMinutes(value)
}

function handleHoursChange(value, setHours) {
  if(value < 0) setHours(0)
  else if(value > 8760) setHours(8760)
  else setHours(value)
}

const DeviceModeTime = ({ mode, device, setDevice, notifications, sessionExpired }) => {

  const [action, setAction] = useState(items[0]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  return (
    <Grid fullWidth>
      <Column lg={9} md={6} sm={4}>
        <Grid>
          <Column lg={3} md={6} sm={4} className='device-mode__input'>
            <Dropdown
              ariaLabel="Dropdown"
              id="dropdown-time-mode"
              label=""
              items={items}
              titleText="Action"
              selectedItem={action}
              itemToString={(item) => (item ? item.label : '')}
              onChange={e => setAction(e.selectedItem)}
            />
          </Column>
          <Column lg={3} md={3} sm={4} className='device-mode__input'>
            <TextInput
              id='input-hours'
              type="number"
              labelText="Hours"
              value={hours}
              onChange={e => handleHoursChange(e.target.value, setHours)}
            />
          </Column>
          <Column lg={3} md={3} sm={4} className='device-mode__input'>
            <TextInput
              id='input-minutes'
              type="number"
              labelText="Minutes"
              value={minutes}
              onChange={e => handleMinutesChange(e.target.value, setMinutes)}
            />
          </Column>
          <Column lg={9} md={6} sm={4} className='device-mode__input'>
            <TextInput
              className='device-mode__info-box'
              id="text-output"
              type="text"
              labelText="Current settings"
              value={device.mode === 2 ? `${getTimeModeInfoString(device.mode, device.rules)}`: ""}
              disabled
            />
          </Column>
        </Grid>
        <Button 
          kind='primary'
          renderIcon={Save}
          onClick={() => handleSetMode(mode, [action.id, getUnixStamp(hours, minutes)], device, setDevice, notifications, sessionExpired)}
          disabled={!device.loaded || compareTimeModeRules(hours, minutes)}
        >
          Save
        </Button>
      </Column>
    </Grid>
  )
}

export default DeviceModeTime