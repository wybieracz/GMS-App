import { TrashCan } from '@carbon/icons-react'

const DeleteButton = ({ onClick }) => {
  return (
    <div className='delete-button' onClick={() => onClick() }>
      <div  className='delete-button__icon'>
        <TrashCan size={16}/>
      </div>
    </div>
  )
}

export default DeleteButton