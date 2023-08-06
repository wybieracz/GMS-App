import React, { useState, useEffect } from 'react';
import { DonutChart, AreaChart, LineChart } from '@carbon/charts-react'
import { Grid, Column, Tile, SkeletonText } from '@carbon/react';
import { getDonutChartsData } from './MainPageUtils';
import { statusChartOptions, typeChartOptions, kWhPieChartOptions, summaryPowerChartOptions, summaryKWhChartOptions } from '../../consts/chartsOptions';
import { useTheme } from '../../components/AutoTheme/AutoTheme';
import { useContext } from 'react';
import NotificationContext from '../../context/NotificationContext';
import { getDevices, getKWhChartData, getSummaryChartData } from './MainPageUtils';

const MainPage = ({ user, sessionExpired }) => {

  const theme = useTheme();
  const notifications = useContext(NotificationContext);
  const [devices, setDevices] = useState({ loaded: false });
  const [chartsData, setChartsData] = useState({ status: [], type: []});
  const [kWhChartData, setKWhChartData] = useState({ data: [], loaded: false });
  const [summaryChartsData, setSummmaryChartsData] = useState({ data: [], loaded: true })
  const [sessionExpiredNotification, setSessionExpiredNotification] = useState(true);

  useEffect(() => {
    getDevices(setDevices, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification);
    getKWhChartData(setKWhChartData, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification);
    getSummaryChartData(setSummmaryChartsData, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDevices(setDevices, sessionExpired, notifications);
      getKWhChartData(setKWhChartData, notifications, sessionExpired);
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    getDonutChartsData(devices, setChartsData);
  }, [devices]);

  return(
    <Grid style={{ margin: 0 }} fullWidth>
      { user.loaded ?
        <Column lg={16} md={8} sm={4}>
          <div className='main-page__title'>
            <h1>Hi, {user.name} {user.surname}</h1>
          </div>
        </Column>
      : 
        <Column lg={16} md={8} sm={4}>
          <div className='main-page__title'>
            <SkeletonText />
          </div>
        </Column>
      }
      { devices.loaded ?
        <Column lg={5} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={chartsData.status}
              options={{
                ...statusChartOptions,
                theme: theme,
                color: { scale: {
                  "Offline": theme === "white" ? "#ee538b" : "#d12771",
                  "Booting": theme === "white" ? "#6929c4" : "#8a3ffc",
                  "Online": theme === "white" ? "#198038" : "#6fdc8c",
                  "In Use": theme === "white" ? "#1192e8" : "#33b1ff"
                }}
              }}
            />
          </Tile>
        </Column>
        :
        <Column lg={5} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={[]}
              options={{ ...statusChartOptions, data: { loading: true }, theme: theme}}
            />
          </Tile>
        </Column>
      }
      { kWhChartData.loaded ?
        <Column lg={6} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={kWhChartData.data}
              options={{
                ...kWhPieChartOptions,
                theme: theme
              }}
            />
          </Tile>
        </Column>
        :
        <Column lg={6} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={[]}
              options={{ ...kWhPieChartOptions, data: { loading: true }, theme: theme}}
            />
          </Tile>
        </Column>
      }
      { devices.loaded ?
        <Column lg={5} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={chartsData.type}
              options={{
                ...typeChartOptions,
                theme: theme,
                color: { scale: {
                  "Programmer": theme === "white" ? "#b28600" : "#d2a106",
                  "Other": theme === "white" ? "#8a3800" : "#ba4e00"
                }}
              }}
            />
          </Tile>
        </Column>
        :
        <Column lg={5} md={8} sm={4}>
          <Tile className='main-page__chart'>
            <DonutChart 
              data={[]}
              options={{ ...typeChartOptions, data: { loading: true }, theme: theme}}
            />
          </Tile>
        </Column>
      }
      {summaryChartsData.loaded ?
      <>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile className='main-page__chart'>
            <div>
              <LineChart 
                data={summaryChartsData.data}
                options={{ 
                  ...summaryPowerChartOptions,
                  theme: theme,
                  color: { scale: { "Power": theme === "white" ? "#6929c4" : "#8a3ffc"}}
                }}
              />
            </div>
          </Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile className='main-page__chart'>
            <div>
              <AreaChart
                data={summaryChartsData.data}
                options={{
                  ...summaryKWhChartOptions,
                  theme: theme,
                  color: { scale: { "Power consumption": theme === "white" ? "#005d5d" : "#007d79"}},
                  experimental: true,
                  zoomBar: { top: { enabled: true }}
                }}
              />
            </div>
          </Tile>
        </Column>
      </> : 
      <>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><LineChart data={[]} options={{ ...summaryPowerChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><AreaChart data={[]} options={{ ...summaryKWhChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
      </>
      }
    </Grid>
  )
}
export default MainPage