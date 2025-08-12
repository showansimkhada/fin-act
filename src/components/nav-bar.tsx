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
					Home
				</a>
			</div>
			<div className="navbar-links">
				<a href='/bs'>
					Balance Sheet
				</a>
				<a href='/report'>
					Report
				</a>
				<a>
					<input type="button" onClick={handleSignOut} value="Log Out"/>
				</a>
				<a href="/profile">
					{username}
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