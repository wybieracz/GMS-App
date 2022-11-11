import axios from "../../utils/axios"

function checkEmail(email) {
  const emailRegExp = RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
  return emailRegExp.test(email)
}

function checkPassword(password) {
  const emailRegExp = RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)
  return emailRegExp.test(password)
}

async function handleRegister(data, navigate, notifications) {
  if(validData(data)) {
    await axios
    .post('/register', data)
    .then(() => {
      navigate('/login')
      notifications.success('Your account has been created.', 'Account creation')
    })
    .catch((err) => notifications.error(err.response.data, 'Account creation'))
  }
}

function validData(data) {
  return (data.name && data.surname && checkEmail(data.email) && checkPassword(data.password))
}

export { checkEmail, checkPassword, handleRegister, validData }