'use client'
import { use, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/lib/Login/loginHooks'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function Login() {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
  
    return (
        <div className="d-flex flex-column align-items-center mt-2">
            <h1>Welcome</h1>
            <form id="login" onSubmit={(event) => {
                event.preventDefault()
                }}>
                <div className="d-flex">
                    <div className="d-flex flex-column justify-content-center p-2">
                        <label className="my-auto mt-2">User Name</label>
                        <label className="my-auto mt-2">Password</label>
                    </div>
                    <div className="d-flex flex-column justify-content-center p-2">
                        <input className="my-auto mt-2" type="text" id="username" name="username" onChange={(event) => {
                            setUser(event.target.value)
                        }}></input>
                        <input className="my-auto mt-2" type="password" id="password" name="password" onChange={(event) => {
                            setPass(event.target.value)
                        }}></input>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <input className="btn btn-primary w-75" type="submit" value="Sign In"></input>
                    <label>Please Sign In</label>
                </div>
            </form>
        </div>
    )
}