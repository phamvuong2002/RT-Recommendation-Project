import React from 'react'

export const LRLoader = ({size = 50}) => {
  return (
    <div className="flex-center h-10">
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="animate-spin">
      <div className="h-full w-full border-4 border-t-red-500
       border-b-red-500 rounded-[50%]">
      </div>
    </div>
  </div>
  )
}
