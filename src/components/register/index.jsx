import React from 'react'
import DarkForm from './dark'



// this Component house both light and dark themes for login form
export default props => {
  const form = !props.isDark ? <DarkForm /> : ''
  return (
    <>
      {form}
    </>
  )
}
