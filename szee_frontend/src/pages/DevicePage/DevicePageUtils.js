import axios from "../../utils/axios";

export async function getDevice(deviceId, setDevices, sessionExpired, notifications) {
  await axios
    .get(`/device/${deviceId}`)
    .then(res => {
      setDevices({ ...res.data, loaded: true });
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications)
      setDevices({ loaded: false })
    })
}

export function ifTabDisabled(device) {
  if(device.loaded) {
    if(device.status === 'Offline' || device.status === 'Booting') return true;
    else return false;
  } else return true;
}