import axios from "../../utils/axios";

export async function getDevices(setDevices, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification) {
  await axios
    .get('/device')
    .then(res => {
      setDevices({ data: res.data, loaded: true });
    })
    .catch((err) => {
      if(err.response.status === 401) {
        sessionExpired(notifications, sessionExpiredNotification);
        setSessionExpiredNotification(false)
      }
      setDevices({ data: [], loaded: true })
  })
}

export function getDonutChartsData(devices, setChartsData) {
  let offline = 0;
  let booting = 0;
  let online = 0;
  let inUse = 0;
  let programmers = 0;
  let other = 0;

  if(devices.loaded) {
    devices.data.forEach(e => {
      switch(e.status) {
        case "Booting": booting++; break;
        case "Online": online++; break;
        case "In Use": inUse++; break;
        default: offline++; break;
      }

      switch(e.type) {
        case "Programmer": programmers++; break;
        default: other++; break;
      }
    })
  }

  setChartsData({
    status: [
      { group: "Offline", value: offline},
      { group: "Booting", value: booting},
      { group: "Online", value: online},
      { group: "In Use", value: inUse}
    ],
    type: [
      { group: "Programmer", value: programmers},
      { group: "Other", value: other},
    ]
  })
}

export function getKWhChartData(setKWhChartData, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification) {
  axios
    .get(`/telemetry/kwh`)
    .then((res) => {
      setKWhChartData({ data: res.data, loaded: true })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        sessionExpired(notifications, sessionExpiredNotification);
        setSessionExpiredNotification(false)
      }
      else {
        notifications.error(`Could not download current power consumption status.`, 'Power consumption')
        setKWhChartData({ data: [], loaded: true })
      }
    })
}

export function getSummaryChartData(setSummaryChartData, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification) {
  axios
    .get(`/telemetry/week`)
    .then((res) => {
      setSummaryChartData({ data: res.data, loaded: true })
    })
    .catch((err) => {
      if(err.response.status === 401) {
        sessionExpired(notifications, sessionExpiredNotification);
        setSessionExpiredNotification(false)
      }
      else {
        notifications.error(`Could not download week status.`, 'Week stats')
        setSummaryChartData({ data: [], loaded: true })
      }
    })
}