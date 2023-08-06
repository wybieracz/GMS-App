import { AreaChart, LineChart } from '@carbon/charts-react';
import { DataEnrichment, Flash, Growth, Plug, Settings } from '@carbon/icons-react';
import { Column, DatePicker, DatePickerInput, Grid, Layer, Tile } from '@carbon/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { currentChartOptions, kWhChartOptions, powerChartOptions, voltageChartOptions } from '../../consts/chartsOptions';
import { useTheme } from '../AutoTheme/AutoTheme';
import DeviceOverviewModeTile from '../DeviceOverviewTile/DeviceOverviewModeTile';
import DeviceOverviewTile from '../DeviceOverviewTile/DeviceOverviewTile';
import { getDeviceTelemetryPerDay } from './DeviceOverviewUtils';

const DeviceOverview = ({ device, notifications, sessionExpired }) =>  {

  const [chartsData, setChartsData] = useState({ loaded: false });
  const [chartsDate, setChartsDate] = useState(new Date());
  const theme = useTheme();
  const { id } = useParams();
  const today = new Date();

  useEffect(() => {
    setChartsData({ loaded: false })
    getDeviceTelemetryPerDay(id, setChartsData, device, chartsDate.getFullYear(), chartsDate.getMonth(), chartsDate.getDate(), notifications, sessionExpired)
  }, [chartsDate])

  return (
    <Grid style={{ margin: 0 }}>
      <Column lg={3} md={4} sm={2}>
        <DeviceOverviewTile 
          name='Voltage'
          value={device.voltage}
          precision={0}
          unit='V'
          Icon={Plug}
          status={device.status}
          loaded={device.loaded}
        />
      </Column>
      <Column lg={3} md={4} sm={2}>
        <DeviceOverviewTile
          name='Current'
          value={device.current}
          precision={2}
          unit='A'
          Icon={Flash}
          status={device.status}
          loaded={device.loaded}
        />
      </Column>
      <Column lg={3} md={4} sm={2}>
        <DeviceOverviewTile
          name='Power'
          value={device.power}
          precision={0}
          unit='W'
          Icon={DataEnrichment}
          status={device.status}
          loaded={device.loaded}
        />
      </Column>
      <Column lg={3} md={4} sm={2}>
        <DeviceOverviewModeTile
          name='Mode'
          value={device.mode}
          Icon={Settings}
          status={device.status}
          loaded={device.loaded}
        />
      </Column>
      <Column lg={4} md={8} sm={4}>
        <DeviceOverviewTile
          name='Power consumption'
          value={device.kWh}
          precision={3}
          unit='kWh'
          Icon={Growth}
          status={device.status}
          loaded={device.loaded}
        />
      </Column>
      <Column lg={16} md={8} sm={4} className='device-overview__chart'>
        <Tile>
          <Layer>
            <DatePicker 
              datePickerType="single"
              className='device-overview__date-input'
              dateFormat='d/m/Y'
              onChange={(e) => chartsDate.toString() !== e[0].toString() ? setChartsDate(e[0]) : () => {}}
              >
              <DatePickerInput
                className='device-overview__date-input'
                placeholder="dd/mm/yyyy"
                labelText="Charts date"
                id="date-picker-single"
                size="md"
                disabled={!chartsData.loaded}
                defaultValue={`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
              />
            </DatePicker>
          </Layer>
        </Tile>
      </Column>
      {chartsData.loaded ?
      <>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile>
            <div>
              <LineChart 
                data={chartsData.power}
                options={{ 
                  ...powerChartOptions,
                  theme: theme,
                  color: { scale: { "Power": theme === "white" ? "#6929c4" : "#8a3ffc"}}
                }}
              />
            </div>
          </Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile>
            <div>
              <AreaChart
                data={chartsData.kWh}
                options={{
                  ...kWhChartOptions,
                  theme: theme,
                  color: { scale: { "Power consumption": theme === "white" ? "#005d5d" : "#007d79"}}
                }}
              />
            </div>
          </Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile>
            <div>
              <LineChart
                data={chartsData.voltage}
                options={{
                  ...voltageChartOptions,
                  theme: theme,
                  color: { scale: { "Voltage": theme === "white" ? "#ee538b" : "#d12771"}}
                }}
              />
            </div>
          </Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile>
            <div>
              <LineChart
                data={chartsData.current}
                options={{
                  ...currentChartOptions,
                  theme: theme,
                  color: { scale: { "Current": theme === "white" ? "#1192e8" : "#33b1ff"}}
                }}
              />
            </div>
          </Tile>
        </Column>
      </> : 
      <>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><LineChart data={[]} options={{ ...powerChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><AreaChart data={[]} options={{ ...kWhChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><LineChart data={[]} options={{ ...voltageChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
        <Column lg={8} md={8} sm={4} className='device-overview__chart'>
          <Tile><LineChart data={[]} options={{ ...currentChartOptions, data: { loading: true }, theme: theme}} /></Tile>
        </Column>
      </>
      }
    </Grid>
  )
}

export default DeviceOverview