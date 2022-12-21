import axios from "../../utils/axios";
import StatusTag from "../../components/StatusTag/StatusTag"

async function getDevices(setDevices, notifications, sessionExpired) {
  await axios
    .get('/device')
    .then(res => {
      setDevices({ data: res.data, loaded: true });
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications);
      setDevices({ data: [], loaded: true })
  })
}

const CellValue = ({ children }) => {
  let value = children.value;
  if(children.info.header === 'voltage' || children.info.header === 'current' || 
    children.info.header === 'power') value = children.value.toFixed(3)
  if(children.info.header === 'kWh') value = children.value.toFixed(5)
  if(children.info.header === 'status') value = <StatusTag status={children.value} size='sm' />
  return value;
}
export { getDevices, CellValue }