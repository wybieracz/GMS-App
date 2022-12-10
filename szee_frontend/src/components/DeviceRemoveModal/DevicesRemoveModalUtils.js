import axios from "../../utils/axios";
import { getDevices } from "../../pages/DevicesPage/DevicesPageUtils";

export async function remove(device, setModal, notifications) {
  await axios
    .delete(`/user/device/${device.id}`)
    .then((res) => {
      
      notifications.info(`${device.name} device successfully unlinked from your acount.`, 'Device unlink')
    })
    .catch((err) => {
      setModal(false)
      notifications.error('Could not unlink this device from your account', 'Device unlink')
    })
}