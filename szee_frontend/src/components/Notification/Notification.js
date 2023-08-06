import { ToastNotification } from '@carbon/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { NotificationType } from '../../consts/notificationType';
import NotificationContext from '../../context/NotificationContext';

const Notification = ({ type, id, title, subtitle, setHeight, closing, top }) => {

  const notification = useContext(NotificationContext);
  const ref = useRef();
  const [isGone, setGone] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        setGone(false)
      })
    }, 100);
  }, [])


  useEffect(() => {
    setHeight(id, ref.current.offsetHeight + 8)
    setTimeout(() => {
      notification.clear(id)
    }, 10000)
  }, [])

  let kind = ''

  switch(type) {
    case(NotificationType.SUCCESS): kind = 'success'; break;
    case(NotificationType.ERROR): kind = 'error'; break;
    case(NotificationType.WARNING): kind = 'warning'; break;
    default: kind = 'info'; break;
  }

  return (
    <div
      className='notification'
      style={{ '--y': top + 'px', '--gone': isGone || closing ? 1 : 0 }}
    >
      <div ref={ref}>
        <ToastNotification
          onClose={() => notification.clear(id)}
          statusIconDescription='notification'
          subtitle={subtitle}
          title={title}
          kind={kind}
        />
      </div>
    </div>
  )
}

export default Notification
