import { ToastNotification } from '@carbon/react';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef, useState } from 'react';
import { NotificationStatus } from '../../consts/notificationStatus';
import NotificationContext from '../../context/NotificationContext';

const Notification = ({ notificationStatus, text, id, title, setMyHeight, closing, top }) => {

  const notification = useContext(NotificationContext)
  const innerToastRef = useRef()

  let [isGone, setGone] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        setGone(false)
      })
    }, 100);
  }, [])


  useEffect(() => {
    setMyHeight(id, innerToastRef.current.offsetHeight + 8)

    setTimeout(() => {
      notification.clear(id)
    }, 10000)
  }, []) //eslint-disable-line react-hooks/exhaustive-deps


  let kind = ''

  if (notificationStatus === NotificationStatus.SUCCESS) kind = 'success'
  if (notificationStatus === NotificationStatus.ERROR) kind = 'error'
  if (notificationStatus === NotificationStatus.INFORMATIONAL) kind = 'info'
  if (notificationStatus === NotificationStatus.WARNING) kind = 'warning'

  return (
    <div
      className='notification'
      style={{
        '--y': top + 'px',
        '--gone': isGone || closing ? 1 : 0,
      }}
    >
      <div
        ref={innerToastRef}
      >
        <ToastNotification
          aria-label='closes notification'
          onClose={() => notification.clear(id)}
          statusIconDescription='notification'
          subtitle={text}
          title={title}
          kind={kind}
        />
      </div>
    </div>
  )
}

Notification.defaultProps = {
  notificationStatus: NotificationStatus.ERROR
}

Notification.propTypes = {
  notificationStatus: PropTypes.oneOf(Object.values(NotificationStatus)),
  text: PropTypes.string
}

export default Notification
