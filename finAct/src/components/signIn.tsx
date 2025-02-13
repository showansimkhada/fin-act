import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { dataSlice } from '@/lib/redux'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import icon from "@/public/icon.ico"

export default function SignIn() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [mess, setMess] = useState('')
  const router = useRouter();
  const dispatch = useDispatch()
  var callBackUrl = '/dash';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user && !pass) {
      setMess("Please enter username and password")
    }
    else if (!user) {
      setMess("Plese enter username")
    }
    else if (!pass) {
      setMess("Please enter password")
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
    <div className="d-flex align-items-center py-4 bg-body-tertiary text-center">
      <div className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <Image className='mb-4' src={icon} alt="favicon" width={64} height={64} />
          <h1>Please Signin</h1>
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
          <input className="btn btn-primary w-100" type="submit" value={`Sign In`}></input>
          <p><code>{mess}</code></p>
        </form>
      </div>
    </div>
  )
}
