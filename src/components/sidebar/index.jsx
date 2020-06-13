import React from 'react'
import NavLinks from './navlinks'

const Sidebar = ({ ...props }) => {
  const listNavs = props.links.map(link => (
    <NavLinks key={Math.random()} {...link} />
  ))
  return (
    <>
      {/** <!--  BEGIN SIDEBAR  --> */}
      <div className='sidebar-wrapper sidebar-theme'>
         <nav id='sidebar'>
         <div className='shadow-bottom' />
         <ul className='list-unstyled menu-categories' id='accordionExample'>
             {listNavs}
           </ul>

         </nav>

       </div>
      {/**  <!--  END SIDEBAR  --> */}

    </>
  )
}

Sidebar.defaultProps = {
  links: [
    {
      name: 'dashboard',
      location: 'dashboard',
      sublinks: [{
        location: 'expenses'
      }]
    },
    {
      name: 'businesses',
      location: 'business'
    }
  ]
}
export default Sidebar
