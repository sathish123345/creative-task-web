import React from 'react'

function CreativeList({creativesList}:any) {
  
  return (
    <div className=' my-2'>
    {creativesList !== undefined && creativesList.map((item:any)=>(
        <div  className="h-20 rounded w-full my-4 p-2 justify-center" style={{backgroundColor: item.backgroundColor}}>
            <p className='text-2xl font-medium'>{item.title}</p>
            <p className='text-xl font-medium'>{item.subtitle}</p>
        </div>
    ))}
</div> 
  )
}

export default CreativeList