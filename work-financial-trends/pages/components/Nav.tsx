'use client'
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export const Nav = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/')
    }
  })
  var username: string = session?.user?.user
  const home = "/dashBS"
  var val;
  if (home === "/dashBS") {
    val = 'Balance Sheet'
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className='container-fluid'>
          <h1 className='navbar-brand'>WELCOME {username}</h1>
          <div className='d-flex justify-content-end'>
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
        </div>
      </nav>
    )
  } else {
    val = "Mussel's Data"
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
              <a href='/mo' id='mussel' className='nav-item nav-link'>{val}</a>
              <a href='/profile' id='profile' className='nav-item nav-link'>Profile</a>
              <a id='signout' className='nav-item nav-link' onClick={() => signOut()}>Sign Out</a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
