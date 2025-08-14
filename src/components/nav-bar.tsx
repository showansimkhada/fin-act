'use client'

import { signOut } from 'next-auth/react'
import { dataSlice, lsUser } from '@/lib/redux'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

export default function Navbars() {
	const [isClient, setIsClient] = useState(false)
	const dispatch = useDispatch()
	const username = String(useSelector(lsUser)).toUpperCase()
	
	useEffect(() => {
		setIsClient(true)
	}, [])

	function handleSignOut() {
		dispatch(dataSlice.actions.clearLS())
		signOut()
	}

	const navJSX = (
		<div className="navbar">
			<div className="navbar-banner">
				<a href='/dash'>
					{username}
				</a>
			</div>
			<input type="checkbox" id="nav-toggle"/>
			<label htmlFor="nav-toggle" className='hamburger'>
				&#9776;
			</label>
			<div className="navbar-links">
				<a href='/bs'>
					Balance Sheet
				</a>
				<a href='/report'>
					Report
				</a>
				<a href="/profile">
					Profile
				</a>
				<a>
					<input type="button" onClick={handleSignOut} value="Log Out"/>
				</a>
			</div>
		</div>
	)

	return  (
		<>
			{isClient ? navJSX: ''}
		</>
	)
}