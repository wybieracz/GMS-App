import axios from "../../utils/axios";

export async function handlePasswordChange(oldPassword, newPassword, resetInputs, sessionExpired, notifications) {
  await axios
    .patch(`/user/password`, { password: oldPassword, newPassword: newPassword})
    .then(res => {
      resetInputs();
      notifications.success('Successfully saved new password.', 'Password change')
    })
    .catch((err) => {
      if(err.response.status === 401) sessionExpired(notifications)
      else {
        resetInputs();
        notifications.error(err.response.data, 'Password change');
      }
    })
}