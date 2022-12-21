import { Button, ButtonSet, Column, Grid } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import AutoModeRule from '../AutoModeRule/AutoModeRule';
import { compareAutoModeRules, handleSetMode, ifHoursIncorrect } from './DeviceModeUtils';
import { Save, Add } from '@carbon/icons-react'

const DeviceModeAuto = ({ mode, device, setDevice, notifications, sessionExpired }) => {

  const [rules, setRules] = useState(device.mode === 3 ? device.rules : [[0, 0, 0, 0, 0]]);

  return (
    <Grid fullWidth>
      <Column lg={16} md={6} sm={4}>
        { rules.map((_, i) => <AutoModeRule key={`${i}:${rules.length}`} id={i} rules={[...rules]} setRules={setRules} />) }
        <ButtonSet>
            <Button kind='secondary' renderIcon={Add} onClick={() => setRules([...rules, [0, 0, 0, 0, 0]])} disabled={rules.length >= 21 }>
              Add rule
            </Button>
            <Button 
              kind='primary'
              renderIcon={Save}
              onClick={() => handleSetMode(mode, rules.flat(), device, setDevice, notifications, sessionExpired)}
              disabled={!device.loaded || compareAutoModeRules(mode, rules, device) || ifHoursIncorrect(mode, rules)}
            >
              Save
            </Button>
          </ButtonSet>
      </Column>
    </Grid>
  )
}

export default DeviceModeAuto