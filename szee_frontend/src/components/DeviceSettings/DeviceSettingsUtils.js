import axios from "../../utils/axios";

export function saveSettings(name, brightness, settings, device, setDevice, periodStart, reset, sessionExpired, notifications) {
  axios
    .post(`/device/${device.id}/settings`, { name: name, periodStart: periodStart, reset: reset, brightness: brightness, lcdSettings: settings })
    .then((res) => {
      if(res.data.status === 'Offline') {
        setDevice({ ...device, loaded: false })
        notifications.error('Device is offline.', 'Device settings')
      } else {
        setDevice({ ...res.data, loaded: true })
        notifications.success('Successfuly saved new settings.', 'Device settings')
      }
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications)
      else if(err.response.data) notifications.error(err.response.data, 'Device settings')
      else notifications.error('Could not save settings!', 'Device settings')
    })
}

export function handlePeriodStartChange(setPeriodStart, value) {
  if(value > 28) setPeriodStart(28)
  else if(value < 1) setPeriodStart(1)
  else setPeriodStart(value)
}