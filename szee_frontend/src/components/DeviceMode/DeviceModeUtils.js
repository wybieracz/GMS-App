import axios from "../../utils/axios";
import { deviceMode } from "../../consts/deviceMode";
import { getTimeString } from "../../utils/timeFunctions";


export function getTimeModeInfoString(mode, rules) {
  if(mode === 2) {
    if(rules[0]) {
      if(rules[1] * 1000 > Date.now()) return `Power supply will be turned on at ${getTimeString(new Date(rules[1] * 1000))}`
      else return `Power supply has been turned on at ${getTimeString(new Date(rules[1] * 1000))}`
    } else {
      if(rules[1] * 1000 > Date.now()) return `Power supply will be turned off at ${getTimeString(new Date(rules[1] * 1000))}`
      else return `Power supply has been turned off at ${getTimeString(new Date(rules[1] * 1000))}`
    }
  } else return ""
  
}

export function compareManualModeRules(mode, enabled, device) {
  if(mode === device.mode && enabled === device.rules[0]) return true;
  else return false;
}

export function compareTimeModeRules(hours, minutes) {
  if(minutes < 1 && hours < 1) return true
  else return false
}

export function compareAutoModeRules(mode, rules, device) {
  if(device.rules.length !== rules.length) return false;
  if(mode === device.mode) {
    let counter = 0;
    for(let i = 0; i < rules.length; i++) {
      for(let j = 0; j < 5; j++) {
        if(rules[i][j] === device.rules[i][j]) {
          counter++;
        }
      }
    }
    if(counter === rules.length * 5) return true;
    else return false;
  }
  return false;
}

export function ifHoursIncorrect(mode, rules) {
  if(mode === 3) {
    for(let i = 0; i < rules.length; i++) {
      if(ifHourIncorrect(rules[i])) return true
    }
    return false
  } return true
}

export function ifHourIncorrect(rule) {
  if((rule[1] === rule[3] && rule[2] >= rule[4]) || (rule[1] > rule[3])) return true;
  else return false;
}

export async function handleSetMode(mode, rules, device, setDevice, notifications, sessionExpired) {
  
  await axios
    .post(`/device/${device.id}/mode`, { mode: mode, rules: rules })
    .then((res) => {
      if(device.mode !== mode) notifications.success(`${deviceMode[res.data.mode - 1].text} successfully configured on device.`, 'New operating mode');
      else if(mode === 1 && rules[0] === 0) notifications.success(`External device connected to ${device.name} is now turned off.`, 'Power supply off');
      else if(mode === 1 && rules[0] === 1) notifications.success(`External device connected to ${device.name} is now turned on.`, 'Power supply on');
      else notifications.success(`Operating mode rules successfully saved.`, 'Operating mode');
      setDevice({ ...res.data, loaded: true })
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications, true)
      else if(err.response.status === 404) notifications.error("Device is currently offline.", 'Operating mode');
      else if(err.response.data) notifications.error(err.response.data, 'Operating mode')
      else notifications.error("Something went wrong.", 'Operating mode');
    })
}