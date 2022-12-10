import { Status, Type } from "../Models/Device"

export const defaultDeviceLive = {
  id: "",
  userId: 0,
  type: Type.Other,
  name: "",
  voltage: 0,
  current: 0,
  power: 0,
  kWh: 0,
  timestamp: "1970-01-01 00:00:00",
  status: Status.Offline
}

export const defaultDeviceLiveWithSettings = {
  id: "",
  userId: 0,
  type: Type.Other,
  name: "",
  voltage: 0,
  current: 0,
  power: 0,
  kWh: 0,
  relayState: false,
  mode: 1,
  rules: [0],
  reset: true,
  periodStart: 1,
  brightness: 255,
  lcdSettings: [1, 2],
  timestamp: "1970-01-01 00:00:00",
  status: Status.Offline
}