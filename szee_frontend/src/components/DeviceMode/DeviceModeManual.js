import React, { useState } from 'react';
import { Toggle, Button } from '@carbon/react';
import { handleSetMode } from './DeviceModeUtils';
import { compareManualModeRules  } from './DeviceModeUtils';
import { Save } from '@carbon/icons-react'

const DeviceModeManual = ({ mode, device, setDevice, notifications, sessionExpired }) => {

  const [enabled, setEnabled] = useState(device.rules[0])

  return (
    <> 
      <Toggle 
        labelText="Enable device"
        labelA="Off"
        labelB="On"
        id="toggle-mode-1"
        onToggle={e => setEnabled(e)}
        toggled={enabled}
      />
      <Button 
        kind='primary'
        renderIcon={Save}
        onClick={() => handleSetMode(mode, enabled ? [1] : [0], device, setDevice, notifications, sessionExpired)}
        disabled={!device.loaded || compareManualModeRules(mode, enabled ? 1 : 0, device)}
      >
        Save
      </Button>
    </>
  )
}

export default DeviceModeManual