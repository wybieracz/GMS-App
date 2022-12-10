import { Modal } from '@carbon/react';
import React, { useState } from 'react';

const DeviceRemoveModal = ({ modal, setModal, notifications, device }) => {

  return (
    <Modal
      danger
      open={modal}
      modalHeading='Are you sure you want to unlink this device from your account?
        All historical data of this device will be removed! Device will reset and restart.'
      modalLabel='Account resources'
      primaryButtonText='Unlink'
      secondaryButtonText='Cancel'
      onKeyDown={() => {}}
      onRequestSubmit={() => {}}
      onSecondarySubmit={() => setModal(false)}
      onRequestClose={() => setModal(false)}>
    </Modal>
  )
}

export default DeviceRemoveModal