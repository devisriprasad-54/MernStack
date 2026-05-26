import React from 'react'
import {useRouteError} from 'react-router'
function ErrorPage() {
    const {data,status,statusText}=useRouteError()
  return (
    <div>
        <div className='flex flex-col items-center justify-center h-screen '>
            <h1 className='text-2xl font-bold text-red-500'>Error</h1>
            <p className='text-red-500'>{data}</p>
            <p className='text-red-500'>{status}</p>
            <p className='text-red-500'>{statusText}</p>
        </div>
    </div>
  )
}

export default ErrorPage