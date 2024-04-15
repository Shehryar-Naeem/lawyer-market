import React from 'react'
import { MdDelete } from 'react-icons/md'
import { Images } from '../../assets/images'

const AccountComp = () => {
  return (
    <div className='flex gap justify-between items-center'>
        <div className="item-center gap">
            <img src={Images.lawyer} alt="profile" className="lg:w-icon-width md:w-md-icon-width w-sm-icon-width " />
            <span>role</span>
        </div>
        <span>
        <MdDelete />
        </span>
    </div>
  )
}

export default AccountComp