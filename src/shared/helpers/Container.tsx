import React from 'react'

interface ContainerProps {
  children: React.ReactNode;
}

const Container :React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="max-w-[1250px] mx-auto  w-[95%]">
      {children}
    </div>
  )
}

export default Container
