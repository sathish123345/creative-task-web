import React from 'react'

function ProgressBar({creativesLength}:any) {
  return (
    <div className='flex flex-row w-full'>
          <div className='border-2 h-7 w-full'>
        <div className='bg-blue-500 h-6' style={{width:`${creativesLength*20}%`}}></div>
    </div>
    <p className=''>{creativesLength}/5 Creatives</p>
    </div>
  
  )
}

export default ProgressBar