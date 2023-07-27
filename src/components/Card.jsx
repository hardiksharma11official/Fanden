import React from 'react'

const Card = ({review,name,image}) => {
  return (
    <div className='p-10 space-y-5'>
      <div className='flex justify-center items-center'>
        <img src={image} alt="" 
            className='rounded-full h-32 w-32'
        />
      </div>

      <div className='p-5 text-lg'>
        {review}
      </div>
      <p className='text-right text-lg'>- {name}</p>

    </div>
  )
}

export default Card
