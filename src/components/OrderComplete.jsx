import React from 'react'

const OrderComplete = () => {
    const loggedInUserData = JSON.parse(localStorage.getItem('loggedInUserData'));
    const { firstname, lastname, email } = loggedInUserData || {};

  return (
    <div>Thank you for your Order!{firstname} </div>
  )
}

export default OrderComplete