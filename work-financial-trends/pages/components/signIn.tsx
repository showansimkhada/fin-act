import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { dataSlice } from '@/lib/redux'
import { useDispatch } from 'react-redux'
import { formatDate, getWeekday } from '@/lib/funcPage'

export default function SignIn() {
  const [user, setUser] = useState('')
  const [dateState, setDateState] = useState(true)
  const [pass, setPass] = useState('')
  const [mess, setMess] = useState('')
  const [cD, setCD] = useState(formatDate(Date()))
  const weekDay = getWeekday(cD)
  const [page, setPage] = useState('Mussel Entry')
  if (dateState) {
    if ( weekDay === 'Saturday' || weekDay === 'Sunday') {
      setDateState(false)
      setPage('Balance Sheet')
    }
  }
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
    <div className='container'>
      <div className="d-flex flex-column justify-content-center align-items-center" style={{height: '80vh'}}>
        <h1>Financial Trends</h1>
        <form id="login" onSubmit={handleSubmit}>
          <div className="d-flex">
            <div className="d-flex flex-column justify-content-center p-2">
              <label className="my-auto mt-2">User Name</label>
              <label className="my-auto mt-2">Password</label>
            </div>
            <div className="d-flex flex-column justify-content-center p-2">
              <input className="my-auto mt-2" type="text" id="username" name="username" autoCapitalize='none' onChange={(event)=> {
                setUser(event.target.value)
              }}></input>
              <input className="my-auto mt-2" type="password" id="password" name="password" onChange={(event) => {
                setPass(event.target.value)
              }}></input>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <input className="btn btn-primary w-100" type="submit" value={`Sign In`}></input>
          </div>
        </form>
      </div>
      <p>
        <code>{mess}</code>
      </p>
      </div>
  )
}
