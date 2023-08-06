import React, { useState } from 'react';
import { TextInput, Modal, Stack } from '@carbon/react';
import { handleIdChange, handleConnectionStringChange, addDevice, closeModal } from './DevicesAddModalUtils';

const DevicesAddModal = ({ modal, setModal, notifications, devices, setDevices, sessionExpired }) => {

  const [id, setId] = useState("");
  const [connectionString, setConnectionString] = useState("");
  const [idInvalid, setIdInvalid] = useState(false);
  const [connectionStringInvalid, setConnectionStringInvalid] = useState(false);

  return (
    <Modal
      open={modal}
      modalHeading='Add new device'
      modalLabel='Account resources'
      primaryButtonText='Add'
      secondaryButtonText='Cancel'
      onKeyDown={() => 
        addDevice(id, setId, connectionString, setConnectionString, setModal, notifications,
        devices, setDevices, setIdInvalid, setConnectionStringInvalid, sessionExpired)}
      onRequestSubmit={() =>
        addDevice(id, setId, connectionString, setConnectionString, setModal, notifications,
        devices, setDevices, setIdInvalid, setConnectionStringInvalid, sessionExpired)}
      onSecondarySubmit={() => closeModal(setModal, setId, setIdInvalid, setConnectionString, setConnectionStringInvalid)}
      onRequestClose={() => closeModal(setModal, setId, setIdInvalid, setConnectionString, setConnectionStringInvalid)}
      primaryButtonDisabled={idInvalid || connectionStringInvalid}>
      <Stack gap={7}>
        <TextInput
          id='input-id'
          labelText='ID'
          value={id}
          onChange={e => handleIdChange(e.target.value, setId, setIdInvalid)}
          invalid={idInvalid}
          invalidText='ID should be 6 characters long.'
        />
        <TextInput
          id='input-id'
          labelText='Connection string'
          value={connectionString}
          onChange={e => handleConnectionStringChange(e.target.value, setConnectionString, setConnectionStringInvalid)}
          invalid={connectionStringInvalid}
          invalidText='Connection string should be 12 characters long.'
        />
      </Stack>
    </Modal>
  )
}

export default DevicesAddModal