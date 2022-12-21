import { Add } from '@carbon/icons-react';
import {
  Button, Column, DataTable, DataTableSkeleton, Grid, Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableHeader, TableRow, TableToolbar,
  TableToolbarContent, TableToolbarSearch
} from '@carbon/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DevicesAddModal from '../../components/DevicesAddModal/DevicesAddModal';
import NotificationContext from '../../context/NotificationContext';
import { CellValue, getDevices } from './DevicesPageUtils';

const headers = [
  { key: 'name', header: 'Name'},
  { key: 'type', header: 'Type'},
  { key: 'voltage', header: 'Voltage [V]'},
  { key: 'current', header: 'Current [A]'},
  { key: 'power', header: 'Power [W]'},
  { key: 'kWh', header: 'Counter [kWh]'},
  { key: 'status', header: 'Status'}
];

const DevicesPage = ({ user, sessionExpired }) => {

  const navigate = useNavigate()
  const notifications = useContext(NotificationContext);
  const [devices, setDevices] = useState({ loaded: false });
  const [modal, setModal] = useState(false);
  const [sessionExpiredNotification, setSessionExpiredNotification] = useState(false);

  useEffect(() => {
    getDevices(setDevices, notifications, sessionExpired, sessionExpiredNotification, setSessionExpiredNotification);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDevices(setDevices, notifications, sessionExpired);
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid className='devices-page'>
      <Column lg={16} md={8} sm={4} className='devices-page__content'>
        <div className='devices-page__title'>
          <h1>All devices</h1>
        </div>
        { devices.loaded ?
          <DataTable rows={devices.data} headers={headers} isSortable>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getToolbarProps,
              getBatchActionProps,
              onInputChange,
              selectedRows,
              getTableProps,
              getTableContainerProps,
            }) => {
              const batchActionProps = getBatchActionProps();
              return (
                <TableContainer
                  {...getTableContainerProps()}>
                  <TableToolbar {...getToolbarProps()}>
                    <TableToolbarContent
                      aria-hidden={batchActionProps.shouldShowBatchActions}>
                      <TableToolbarSearch
                        tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                        onChange={onInputChange}
                        placeholder='Find device'
                        persistent
                      />
                      <Button
                        tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                        size="sm"
                        kind="primary"
                        renderIcon={Add}
                        onClick={() => setModal(true)}>
                        Add new
                      </Button>
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map((header, i) => (
                          <TableHeader key={i} {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, i) => (
                        <TableRow key={i} {...getRowProps({ row })} onClick={() => navigate(`/device/${row.id}`)} className='devices-page__device'>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}><CellValue>{cell}</CellValue></TableCell>
                            ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            }}
          </DataTable>
        : <DataTableSkeleton headers={headers} showHeader={false} rowCount={3} columnCount={7} />}
      </Column>
      <DevicesAddModal modal={modal} setModal={setModal} notifications={notifications} devices={devices} setDevices={setDevices} />
    </Grid>
  )
}

export default DevicesPage