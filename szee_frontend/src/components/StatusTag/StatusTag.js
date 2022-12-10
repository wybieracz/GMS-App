import { Tag } from "@carbon/react"

const StatusTag = ({ status, size }) => {
  switch(status) {
    case 'Offline': return <Tag className='status-tag' type='magenta' size={size}>{status}</Tag>
    case 'Booting': return <Tag className='status-tag' type='purple' size={size}>{status}</Tag>
    case 'Online': return <Tag className='status-tag' type='green' size={size}>{status}</Tag>
    case 'In Use': return <Tag className='status-tag' type='blue' size={size}>{status}</Tag>
    default: return <Tag className='status-tag' type='cool-gray' size={size}>{status}</Tag>
  }
}

export default StatusTag