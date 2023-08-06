import axios from "../../utils/axios";

export async function remove(device, navigate, setModal, notifications, sessionExpired) {
  await axios
    .delete(`/user/device/${device.id}`)
    .then(() => {
      setModal(false)
      navigate('/devices')
      notifications.info(`${device.name} device successfully unlinked from your account.`, 'Device unlink')
    })
    .catch((err) => {
      setModal(false)
      if(err.response.status === 401) sessionExpired(notifications)
      else notifications.error('Could not unlink this device from your account', 'Device unlink')
    })
}