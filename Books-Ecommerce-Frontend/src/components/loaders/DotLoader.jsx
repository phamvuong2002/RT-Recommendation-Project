import React from 'react'

export const DotLoader = ({size = 4, gap = 4, color="red-500"}) => {
  return (
    <div>
        <div className="flex justify-center items-center">
            <div className={`flex flex-row gap-${gap}`}>
            <div className={`w-${size} h-${size} rounded-full bg-${color} animate-bounce`}></div>
            <div className={`w-${size} h-${size} rounded-full bg-${color} animate-bounce [animation-delay:-.5s`}></div>
            <div className={`w-${size} h-${size} rounded-full bg-${color} animate-bounce [animation-delay:-.8s]`}></div>
            </div>
        </div>
    </div>
  )
}
