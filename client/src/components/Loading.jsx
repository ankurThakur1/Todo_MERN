import React from 'react'
import { CgSpinner } from "react-icons/cg";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* <h1>Loading...</h1> */}
      <CgSpinner size={80} className="animate-spin text-amber-600" />  
    </div>
  )
}

export default Loading;