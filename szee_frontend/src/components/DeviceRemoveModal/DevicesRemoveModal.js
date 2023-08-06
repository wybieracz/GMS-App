import { Modal } from '@carbon/react';
import React from 'react';
import { remove } from './DevicesRemoveModalUtils';

const DeviceRemoveModal = ({ device, navigate, modal, setModal, notifications, sessionExpired }) => {

  return (
    <Modal
      danger
      open={modal}
      modalHeading='Are you sure you want to unlink this device from your account?
        All historical data of this device will be removed! Device will reset and restart.'
      modalLabel='Account resources'
      primaryButtonText='Unlink'
      secondaryButtonText='Cancel'
      onKeyDown={() => remove(device, setModal, notifications, sessionExpired)}
      onRequestSubmit={() => remove(device, navigate, setModal, notifications, sessionExpired)}
      onSecondarySubmit={() => setModal(false)}
      onRequestClose={() => setModal(false)}>
    </Modal>
  )
}

export default DeviceRemoveModal