import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { dataSlice } from '@/lib/redux'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import logo from "@/public/logo.svg"

export default function SignIn() {
	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	const [mess, setMess] = useState('')
	const router = useRouter();
	const dispatch = useDispatch()
	var callBackUrl = "/dash";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!user && !pass) {
			setMess("Invalid user and password!")
		} else {
			const result = await signIn("credentials", {
				username: user,
				password: pass,
				redirect: false
			})
			if (result?.error) {
				setMess(result.error)
			} else {
				dispatch(dataSlice.actions.setUserName(user))
				router.push(callBackUrl);
			}
		}
	}

	return (
		<div className="form-signin">
			<Image className='react-logo' src={logo} alt="logo"/>
			<form onSubmit={handleSubmit}>
				<div className="form-floating">
					<input className="form-control" type="text" id="username" name="username" autoCapitalize='none' onChange={(event)=> {
					setUser(event.target.value)
					}}></input>
					<label htmlFor="username">Username</label>
				</div>
				<div className='form-floating'>
					<input className="form-control" type="password" id="password" name="password" onChange={(event) => {
					setPass(event.target.value)
					}}></input>
					<label htmlFor='password'>Password</label>
				</div>
				<input className="btn" type="submit" value={`Sign In`}></input>
				<p>
					{mess}
				</p>
			</form>
		</div>
	)
}
