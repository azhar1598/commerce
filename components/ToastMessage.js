import React from 'react'

function ToastMessage() {
  return (
    <ToastContainer
    
    position="bottom-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
  )
}

export default ToastMessage