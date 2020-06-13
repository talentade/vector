import React from 'react'

export default () => {
  return (
    <>
    {/**  <!--  BEGIN NAVBAR  --> */}
    
    <div className="sub-header-container">
        <header className="header navbar navbar-expand-sm">
            <a href="javascript:void(0);" className="sidebarCollapse" data-placement="bottom"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg></a>

            <ul className="navbar-nav flex-row">
                <li>
                    <div className="page-header">

                        <nav className="breadcrumb-one" aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="javascript:void(0);">Dashboard</a></li>
                                <li className="breadcrumb-item active" aria-current="page"><span>Business</span></li>
                            </ol>
                        </nav>

                    </div>
                </li>
            </ul>
            <ul className="navbar-nav flex-row ml-auto ">
                <li className="nav-item more-dropdown">
                    <div className="dropdown  custom-dropdown-icon">
                        <a className="dropdown-toggle btn" href="#" role="button" id="customDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span>Settings</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="customDropdown">
                            <a className="dropdown-item" data-value="Settings" href="javascript:void(0);">Settings</a>
                            <a className="dropdown-item" data-value="Mail" href="javascript:void(0);">Mail</a>
                            <a className="dropdown-item" data-value="Print" href="javascript:void(0);">Print</a>
                            <a className="dropdown-item" data-value="Download" href="javascript:void(0);">Download</a>
                            <a className="dropdown-item" data-value="Share" href="javascript:void(0);">Share</a>
                        </div>
                    </div>
                </li>
            </ul>
        </header>
    </div>
    {/**<!--  END NAVBAR  --> */}

    </>
  )
}


