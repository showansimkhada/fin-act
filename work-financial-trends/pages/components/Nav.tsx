'use client'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { signOut } from 'next-auth/react'

export const Nav = () => {
  const home = "/dashBS"
  let val;
  if (home === "/dashBS") {
    val = 'Balance Sheet'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className='container-fluid'>
        <h1 className='navbar-brand'>WELCOME</h1>
        <button type="button" className='navbar-toggler' data-bs-toggle="collapse" data-bs-traget="#navbarCollapse">
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <div className='navbar-nav'>
            <a href={home} id='home' className='nav-item nav-link'>Home</a>
            <a href='/bs' id='balance' className='nav-item nav-link'>{val}</a>
            <a href='/profile' id='profile' className='nav-item nav-link'>Profile</a>
            <a id='signout' className='nav-item nav-link' onClick={() => signOut()}>Sign Out</a>
          </div>
        </div>
      </div>
      {/* <Link
        className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === '/verify' ? styles.active : ''
        }`}
        href="/verify"
      >
        Verify
      </Link> */}
      {/* nav(class='navbar navbar-expand-lg navbar-dark bg-dark fixed-top')
            div(class='container-fluid')
                h1(class='navbar-brand') WELCOME 
                    label #{firstname.toUpperCase()}
                button(type='button' class='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#navbarCollapse')
                    span(class='navbar-toggler-icon')
                div(class='collapse navbar-collapse' id='navbarCollapse')
                    div(class='navbar-nav')
                        a(href='/home' id='home' class='nav-item nav-link') Home
                        a(href='/bs' id='balance' class='nav-item nav-link') Balance Sheet
                        a(href='/mo' id='mussel' class='nav-item nav-link') Mussel Opened
                        a(href='/profile' id='profile' class='nav-item nav-link') Profile
                        a(href='/signout' id='signout' class='nav-item nav-link') Sign Out */}
    </nav>
  )
}
