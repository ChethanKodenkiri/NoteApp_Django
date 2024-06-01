import React from 'react'
import Form from '../components/form'

function login() {
  return (
    <Form route='api/token' method='login'/>
    
  )
}

export default login