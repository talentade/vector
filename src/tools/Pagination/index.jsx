import React from 'react'
import * as Page from './styles'
import { SelectAlt } from '../../components/Input'

const Pagination = ({ data, currentPage, handlePagnationUp, handlePagnationDown, newindexOfFirstUser, handleDataRange, pageUsers, allUsers, pageNumbers, selectedPage, pageLimit, upperPageBound, lowerPageBound, ...props}) => {
  const pages = pageNumbers().map(page => {
    if (page.page === data.currentPage) {
      return <Page.PageNumber active key={page.id} onClick={() => selectedPage(page.page)} className='currentpage'>{page.page}</Page.PageNumber>
    }
    if (page.page <= upperPageBound && page.page > lowerPageBound) {
      return <Page.PageNumber key={page.id} onClick={() => selectedPage(page.page)}>{page.page}</Page.PageNumber>
    }
    return null
  })
  return (
    <Page.Wrapper {...props}>
      <div style={{ cursor: 'pointer' }}>
        {data.currentPage !== 1 ? <Page.Button onClick={handlePagnationDown} value='Prev'><img className='double_arrow rotate ' src={require('../../themes/images/arrow-drop-left.svg')} alt='arrow-left' /> </Page.Button> : null}
        {pages}
        {data.currentPage >= Math.ceil(data.count / data.usersPerPage) ? null : <Page.Button onClick={handlePagnationUp} type='button' value='Next'><img className='double_arrow' src={require('../../themes/images/arrow-drop-right.svg')} alt='arrow-right' /></Page.Button> }
      </div>
      <div style={{ display: 'flex' }}>
        <Page.SelectContainer>
          <span className='selectedText'>View</span>
          <SelectAlt changed={handleDataRange} marTop='0' >
            <option hidden>{data.usersPerPage}</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </SelectAlt>
          <span className='selectedText'>Items per page</span>
        </Page.SelectContainer>
      </div>
      <div>
        <span> {newindexOfFirstUser || 0 } - {pageUsers || 0 } out of {allUsers || 0}  </span>
        {/* <span>{currentUsers.length < 1 ? 0 : pages.currentPage} / {Math.ceil(pages.data.length / pages.usersPerPage)} </span> */}
      </div>
    </Page.Wrapper>
  )
}

export default Pagination
