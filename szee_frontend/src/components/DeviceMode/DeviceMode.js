import { RadioButton, RadioButtonGroup, Stack } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import DeviceModeAuto from './DeviceModeAuto';
import DeviceModeManual from './DeviceModeManual';
import DeviceModeTime from './DeviceModeTime';

const DeviceMode = ({ device, setDevice, notifications, sessionExpired }) => {

  const [mode, setMode] = useState(device.mode);

  useEffect(() => {
    setMode(device.mode)
  }, [device])

  return (
    <Stack gap={7} className='device-mode__content'>
      <RadioButtonGroup
        legendText="Mode"
        name="radio-button-group"
        onChange={(e) => setMode(e)}
        valueSelected={mode}
      >
        <RadioButton
          id="radio-manual"
          labelText="Manual mode"
          value={1}
        />
        <RadioButton
          id="radio-time"
          labelText="Time mode"
          value={2}
        />
        <RadioButton
          id="radio-auto"
          labelText="Auto mode"
          value={3}
        />
      </RadioButtonGroup>
      { device.loaded && mode === 1
        ? <DeviceModeManual
          mode={mode}
          device={device}
          setDevice={setDevice}
          notifications={notifications}
          sessionExpired={sessionExpired} 
        />
        : null
      }
      { device.loaded && mode === 2
        ? <DeviceModeTime
          mode={mode}
          device={device}
          setDevice={setDevice}
          notifications={notifications}
          sessionExpired={sessionExpired} 
        />
        : null
      }
      { device.loaded && mode === 3
        ? <DeviceModeAuto
          mode={mode}
          device={device}
          setDevice={setDevice}
          notifications={notifications}
          sessionExpired={sessionExpired} 
        />
        : null
      }
      
    </Stack>
  )
}

export default DeviceMode
