import { IDeviceMode, IDeviceSettings, Status } from "../Models/Device";

export function getDeviceStatus(status: number, relayState: number) {
  if(status == 200) {
    if(relayState) return Status.InUse;
    else return Status.Online;
  }
  else if(status === 425) return Status.Booting;
  return Status.Offline;
}

export function getRules(mode: number, rules: string) {
  switch(mode) {
    case 3: {
      const result = [];
      for(let i = rules.length / 9; i > 0; i--) {
        result.push([
          parseInt(rules.slice(0, 1)),
          parseInt(rules.slice(1, 3)),
          parseInt(rules.slice(3, 5)),
          parseInt(rules.slice(5, 7)),
          parseInt(rules.slice(7, 9))
        ])
        rules = rules.slice(9);
      }
      return result;
    }
    case 2: {
      return [parseInt(rules.slice(0, 1)), parseInt(rules.slice(1))];
    }
    default: return [parseInt(rules)];
  }
}

export function getDisplaySettings(settings: string) {
  return [parseInt(settings.slice(0, 1)), parseInt(settings.slice(1))];
}

export function getDevicesParams(data: any) {
  return {
    voltage: data.payload.voltage,
    current: data.payload.current,
    power: data.payload.power,
    kWh: data.payload.kWh,
    timestamp: data.payload.timestamp,
    status: getDeviceStatus(data.status, data.payload.relayState)
  }
}

export function getDeviceParams(data: any) {
  return {
    voltage: data.payload.voltage,
    current: data.payload.current,
    power: data.payload.power,
    kWh: data.payload.kWh,
    relayState: Boolean(data.payload.relayState),
    mode: data.payload.mode,
    rules: getRules(data.payload.mode, data.payload.rules),
    reset: Boolean(data.payload.reset),
    periodStart: data.payload.periodStart,
    brightness: data.payload.brightness,
    lcdSettings: getDisplaySettings(data.payload.lcdSettings),
    timestamp: data.payload.timestamp,
    status: getDeviceStatus(data.status, data.payload.relayState)
  }
}

export function getSettingsCharArray(settings: IDeviceSettings) {
  return `${('0' + settings.periodStart).slice(-2)}${settings.reset ? '1' : '0'}${settings.lcdSettings[0]}${settings.lcdSettings[1]}${('00' + settings.brightness).slice(-3)}`
}

function getManualModeCharArray(rules: Array<number>) {
  return `1${rules[0]}`;
}

function getTimeModeCharArray(rules: Array<number>) {
  return `2${rules[0]}${rules[1]}`;
}

function getAutoModeCharArray(rules: Array<number>) {
  let result = "";

  for(let i = 0; i < rules.length; i++) {
    if(i % 5) {
      if(rules[i] > 9) result = result + `${rules[i]}`;
      else result = result + `0${rules[i]}`;
    } else {
      result = result + `${rules[i]}`;
    }
  }
  return "3" + result;
}

export function getModeCharArray(mode: number, rules: Array<number>) {
  switch(mode) {
    case 3: return getAutoModeCharArray(rules);
    case 2: return getTimeModeCharArray(rules);
    default: return getManualModeCharArray(rules);
  }
}