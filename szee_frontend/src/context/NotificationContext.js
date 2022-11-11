import { createContext, useEffect, useState } from 'react';
import Notification from '../components/Notification/Notification';
import { NotificationStatus } from '../consts/notificationStatus';

const NotificationContext = createContext({
    notifications: {
        notifications: [],
        notificationsClosing: [],
        translationData: []
    },
    text: null,
    success: () => { },
    error: () => { },
})

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({
    notifications: [],
    tops: [],
    closingIds: [],
  })

  const setHeight = (id, height) => {
    const n = notifications.notifications.find(e => e.id === id)
    if (n != null) n.height = height
  }

  useEffect(() => {
    setNotifications(prev => {
      let top = 0
      return ({
        ...prev,
        tops: prev.notifications.map(e => {
          const value = top
          if (!prev.closingIds.includes(e.id))
            top += e.height
          return value
        })
      })
    })
  }, [notifications.notifications])

  const showNotification = (text, status, title) => {
    const id = `${Date.now()}${Math.random() * 1000 | 0}`

    setNotifications((prev) => ({
      ...prev,
      notifications: [{
        notificationStatus: status,
        text: text,
        id: id,
        title: title,
        height: 0,
      },
      ...prev.notifications
      ],
    }))
  }

  const success = (message, title = 'Success') => {
    showNotification(message, NotificationStatus.SUCCESS, title)
  }

  const error = (message, title = 'Error') => {
    showNotification(message, NotificationStatus.ERROR, title)
  }

  const info = (message, title = 'Information') => {
    showNotification(message, NotificationStatus.INFORMATIONAL, title)
  }

  const warning = (message, title = 'Warning') => {
    showNotification(message, NotificationStatus.WARNING, title)
  }

  const clear = (id) => {

    setNotifications((prev) => ({
      ...prev,
      closingIds: [
        ...prev.closingIds,
        id
      ],
    }))

    setTimeout(() => {
      setNotifications((prev) => ({
        ...prev,
        notifications: [...prev.notifications.filter(e => (e.id !== id))],
        closingIds: [...prev.closingIds.filter(e => (e !== id))],
      }))
    }, 240)

    return false
  }

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        info,
        warning,
        clear,
        notifications,
        setNotifications
      }}
    >
      {children}
      <div className='notification-context__wrapper'>
        <div className='notification-context__wrapper__relative'>
          {
            notifications.notifications.map((notification, i) =>
              <Notification
                id={notification.id}
                key={notification.id}
                notificationStatus={notification.notificationStatus}
                text={notification.text}
                title={notification.title}
                top={notifications.tops[i]}
                setMyHeight={setHeight}
                closing={notifications.closingIds.includes(notification.id)}
              />
            )
          }
        </div>
      </div>
    </NotificationContext.Provider>
  )
}

export { NotificationProvider }
export default NotificationContext
