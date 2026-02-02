import React from 'react'
import Carousel from '../components/Cars/ui/Carousel'
import Cars from '../components/Cars/ui/Cars'
const CarsPage:React.FC = () => {
  return (
    <div className='flex flex-col gap-[40px]'>
      <Carousel />
      <Cars/>
    </div>
  )
}

export default CarsPage
