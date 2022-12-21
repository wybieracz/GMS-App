import React, { useState, useEffect, useContext } from 'react';
import { Save, Unlink } from '@carbon/icons-react'
import { TextInput, Stack, Column, Grid, Dropdown, TextInputSkeleton,
  DropdownSkeleton, SliderSkeleton, Slider, Button, ButtonSkeleton, Toggle, ButtonSet } from '@carbon/react';
import { lcdSettings } from '../../consts/deviceSettings';
import { saveSettings, handlePeriodStartChange } from './DeviceSettingsUtils';
import NotificationContext from '../../context/NotificationContext';
import DeviceRemoveModal from '../DeviceRemoveModal/DevicesRemoveModal';

const DeviceSettings = ({ device, setDevice, sessionExpired }) => {

  const notifications = useContext(NotificationContext);
  const [name, setName] = useState("");
  const [settings, setSettings] = useState([0, 0]);
  const [brightness, setBrightness] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [periodStart, setPeriodStart] = useState(1);
  const [reset, setReset] = useState(true);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setName(device.name);
    setSettings(device.lcdSettings)
    setBrightness(device.brightness)
    setLoaded(device.loaded)
  }, [device])

  return (
    <Grid className='device-settings'>
      <Column lg={8} md={7} sm={4}>
      {loaded ?
        <Stack gap={7}>
          <TextInput
            id='input-name'
            className='device-settings__filed' 
            labelText='Device name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Dropdown
            id='dopdown-first-row'
            titleText="Display first row"
            className='device-settings__filed'
            label=""
            items={lcdSettings}
            itemToString={(item) => (item ? item.text : '')}
            selectedItem={lcdSettings[settings[0] - 1]}
            onChange={(e) => setSettings([e.selectedItem.id, settings[1]])}
          />
          <Dropdown
            id='dopdown-second-row'
            titleText="Display second row"
            className='device-settings__filed'
            label=""
            items={lcdSettings}
            itemToString={(item) => (item ? item.text : '')}
            selectedItem={lcdSettings[settings[1] - 1]}
            onChange={(e) => setSettings([settings[0], e.selectedItem.id])}
          />
          <Slider
            className='device-settings__filed' 
            labelText="Display brightness"
            value={brightness}
            min={0}
            max={255}
            step={5}
            stepMultiplier={3}
            noValidate
            hideTextInput
            onChange={(e) => setBrightness(e.value)}
            size='lg'
          />
          <Grid className='device-settings__counter'>
            <Column lg={5} md={4} sm={2} className='device-settings__counter'>
              <TextInput
                id='input-period'
                type="number"
                labelText="First day of period"
                value={periodStart}
                onChange={e => handlePeriodStartChange(setPeriodStart, e.target.value)}
                disabled={!reset}
              />
            </Column>
            <Column lg={3} md={3} sm={2} className='device-settings__counter'>
              <Toggle
                className='device-settings__toggle'
                labelText='Auto reset counter'
                labelA="Off"
                labelB="On"
                toggled={reset}
                onToggle={e => setReset(e)}
                id="toggle-period"
              />
            </Column>
          </Grid>
          <ButtonSet>
            <Button kind='secondary' renderIcon={Unlink} onClick={() => setModal(true)}>
              Unlink
            </Button>
            <Button renderIcon={Save} onClick={() => 
              saveSettings(name, brightness, 
                settings, device, 
                setDevice, periodStart, 
                reset, sessionExpired, 
                notifications
              )}
            >
              Save
            </Button>
          </ButtonSet>
        </Stack>
      :
        <Stack gap={7}>
          <TextInputSkeleton 
            className='device-settings__text' 
            labelText='Device name'
          />
          <DropdownSkeleton
            titleText="Display first row"
            label="Dropdown menu options"
          />
          <DropdownSkeleton
            titleText="Display second row"
            label="Dropdown menu options"
          />
          <SliderSkeleton />
          <Grid className='device-settings'>
            <Column lg={5} md={4} sm={2} className='device-settings'>
              <TextInputSkeleton 
                className='device-settings__text' 
                labelText='Device name'
              />
            </Column>
          </Grid>
          <ButtonSet>
            <ButtonSkeleton />
            <ButtonSkeleton />
          </ButtonSet>
        </Stack>
      }
      </Column>
      <DeviceRemoveModal
        device={device}
        modal={modal}
        setModal={setModal}
        sessionExpired={sessionExpired}
        notifications={notifications}
      />
    </Grid>
  )
}

export default DeviceSettings