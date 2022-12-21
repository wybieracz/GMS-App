import React from 'react';
import { Tile, SkeletonText } from '@carbon/react';

const DeviceOverviewTile = ({ name, value, precision, unit, Icon, status, loaded }) =>  {
  return (
    <Tile className='device-overview-tile'>
      <div className='device-overview-tile__header'>
        {name}
        <Icon size={16} />
      </div>
      { loaded
        ? ( status === "In Use" || status === "Online"
          ? <h1 className='device-overview-tile__value'>{value.toFixed(precision)} {unit}</h1>
          : <h1 className='device-overview-tile__value--offline'>-</h1> )
        : <div className='device-overview-tile__value--skeleton'><SkeletonText /></div>
      }
    </Tile>
  )
}

export default DeviceOverviewTile