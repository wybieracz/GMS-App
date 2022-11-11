import axios from "../../utils/axios";
import { defaultUser } from "../../consts/defaultUser";

function handleLogout(user, setUser, navigate, notifications) {
  axios.post('/logout', { id: user.id })
  .then(() => {
    setUser(defaultUser)
    navigate('/login')
    notifications.success('You have been successfully logout.', 'Logout')
  })
  .catch(() => notifications.error('Something went wrong.', 'Logout'))
}

export { handleLogout }