import axios from "../../utils/axios";

export function getDeviceTelemetry(id, setChartsData, device, notifications, sessionExpired) {
  axios
    .get(`/telemetry/device/${id}`)
    .then((res) => {
      setChartsData({ ...res.data, loaded: true })
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications)
      else if(err.response.data) notifications.error(err.response.data, 'Device telemetry')
      else notifications.error(`Could not download telemetry data for ${device.name} device.`, 'Device telemetry')
    })
}

export function getDeviceTelemetryPerDay(id, setChartsData, device, year, month, day, notifications, sessionExpired) {
  axios
    .get(`/telemetry/device/${id}/${year}/${month}/${day}`)
    .then((res) => {
      setChartsData({ ...res.data, loaded: true })
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications)
      else if(err.response.data) notifications.error(err.response.data, 'Device telemetry')
      else notifications.error(`Could not download telemetry data for ${device.name} device.`, 'Device telemetry')
    })
}