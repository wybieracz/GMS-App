import axios from '../../utils/axios'

function handleEmailChange(value, credentials, setCredentials, setInvalid) {
  setCredentials({...credentials, email: value})
  setInvalid(false)
}

function handlePasswordChange(value, credentials, setCredentials, setInvalid) {
  setCredentials({...credentials, password: value})
  setInvalid(false)
}

async function handleLogin(credentials, setInvalid, navigate, setUser) {
  await axios
    .post('/login', credentials)
    .then(() => {
      axios
        .get('/user')
        .then(res => {
          setUser(res.data)
          navigate('/main')
        })
    })
    .catch(() => setInvalid(true))
}

export { handleEmailChange, handlePasswordChange, handleLogin }