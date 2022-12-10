import { Column, Grid, SkeletonText, Tab, TabList, TabPanel, TabPanels, Tabs, TagSkeleton } from '@carbon/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DeviceMode from '../../components/DeviceMode/DeviceMode';
import DeviceSettings from '../../components/DeviceSettings/DeviceSettings';
import StatusTag from '../../components/StatusTag/StatusTag';
import NotificationContext from '../../context/NotificationContext';
import { getDevice, ifTabDisabled } from './DevicePageUtils';

const DevicePage = ({ user, sessionExpired }) => {

  const { id } = useParams();
  const notifications = useContext(NotificationContext);
  const [device, setDevice] = useState({ loaded: false });
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getDevice(id, setDevice, sessionExpired, notifications);
  }, [])

  return (
    <Grid className='devices-page'>
      <Column lg={16} md={8} sm={4} className='devices-page'>
        <div className='device-page__header'>
          { device.loaded 
            ? <>
                <div className='device-page__title'>
                  <h1>{device.name}</h1>
                  <p className='device-page__id'>{`ID: ${device.id}`}</p>
                </div>
                <StatusTag status={device.status} size='md' />
              </>
            : <>
                <SkeletonText className='device-page__title--skeleton' />
                <TagSkeleton />
              </>
          }
        </div>
        <Tabs className='device-page__tabs'>
          <TabList aria-label="List of tabs" className='device-page__tablist'>
            <Tab>Overview</Tab>
            <Tab disabled={ifTabDisabled(device)}>Mode</Tab>
            <Tab disabled={ifTabDisabled(device)}>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className='device-page__content'>
              Tab Panel 1
            </TabPanel>
            <TabPanel className='device-page__content'>
              <DeviceMode device={device} setDevice={setDevice} notifications={notifications} sessionExpired={sessionExpired} />
            </TabPanel>
            <TabPanel className='device-page__content'>
              <DeviceSettings device={device} setDevice={setDevice} notifications={notifications} sessionExpired={sessionExpired} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
    
    </Grid>
  )
}

export default DevicePage