import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'

const SubLinks = props => {
  const sublinks = props.sublinks.map(link => (
    <Route path={link.location}
      children={({ match }) => (
        <li className={match ? 'active' : '' }>
          <Link to={link.location} style={{ textTransform:'capitalize' }}> {link.location} </Link>
        </li>
      )}
    />
  ))
  return (
    <ul className='submenu list-unstyled collapse show' id='starter-kit' data-parent='#accordionExample' style={{}}>
      {sublinks}
    </ul>
  )
}
const NavLinks = props => {
  const location = `/${props.location}`
  const [toggle, setToggle] = useState(false)
  return (
    <Route
      path={location}
      exact
      children={({ match }) => (
        <li className='menu' onClick={() => setToggle(!toggle)}>
          <Link to={location} data-active={match ? 'true' : ''} data-toggle={match ? 'collapse' : ''} aria-expanded='true' className='dropdown-toggle'>
            <div className=''>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-terminal'><polyline points='4 17 10 11 4 5' /><line x1='12' y1='19' x2='20' y2='19' /></svg>
              <span style={{ textTransform: 'capitalize' }}>{props.name}</span>
            </div>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' className='feather feather-chevron-right'><polyline points='9 18 15 12 9 6' /></svg>
            </div>
          </Link>
          {toggle && props.sublinks && props.sublinks.length > 0 ? <SubLinks sublinks={props.sublinks} /> : null}
        </li>
      )}
    />

  )
}

export default NavLinks
