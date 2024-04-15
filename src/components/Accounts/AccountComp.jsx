import React from 'react'
import { MdDelete } from 'react-icons/md'

const AccountComp = () => {
  return (
    <div className='flex gap justify-between items-center'>
        <div className="item-center gap">
            <img src="https://via.placeholder.com/150" alt="profile" className="rounded-full" />
            <span>role</span>
        </div>
        <span>
        <MdDelete />
        </span>
    </div>
  )
}

export default AccountComp