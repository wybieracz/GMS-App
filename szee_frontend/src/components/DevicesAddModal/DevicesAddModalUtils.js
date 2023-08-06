import axios from "../../utils/axios";
import { getDevices } from "../../pages/DevicesPage/DevicesPageUtils";

function handleIdChange(id, setId, setIdInvalid) {
  setIdInvalid(false)
  if(id.length > 6) setId(id.slice(0, 6))
  else setId(id)
}

function handleConnectionStringChange(connectionString, setConnectionString, setConnectionStringInvalid) {
  setConnectionStringInvalid(false)
  if(connectionString.length > 12) setConnectionString(connectionString.slice(0, 12))
  else setConnectionString(connectionString)
}

function closeModal(setModal, setId, setIdInvalid, setConnectionString, setConnectionStringInvalid) {
  setModal(false)
  setId("")
  setIdInvalid(false)
  setConnectionString("")
  setConnectionStringInvalid(false)
}

async function addDevice(id, setId, connectionString, setConnectionString, setModal, notifications, devices, setDevices, setIdInvalid, setConnectionStringInvalid, sessionExpired) {
  
  if(id.length !== 6) setIdInvalid(true)
  if(connectionString.length !== 12) setConnectionStringInvalid(true)
  if(id.length === 6 && connectionString.length === 12) {
    await axios
    .post('/user/device', { id: id, connectionString: connectionString })
    .then((res) => {
      getDevices(setDevices, notifications, sessionExpired);
      closeModal(setModal, setId, setIdInvalid, setConnectionString, setConnectionStringInvalid)
      notifications.success(`${res.data.type} device successfully added to your account.`, 'Device addition')
    })
    .catch((err) => {
      closeModal(setModal, setId, setIdInvalid, setConnectionString, setConnectionStringInvalid)
      notifications.error(`${err.response.data}`, 'Device addition')
    })
  }
}

export { handleIdChange, handleConnectionStringChange, addDevice, closeModal }