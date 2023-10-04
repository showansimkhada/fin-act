import styles from '../styles/layout.module.css'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export const Login = () => {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [mess, setMess] = useState('')
    const [page, setPage] = useState('Balance Sheet')
    const router = useRouter();
    var callBackUrl = '/';
    if (page === "Balance Sheet") {
        callBackUrl = (router.query?.callBackUrl as string) ?? "/dashBS";
    } else if (page === "Mussel Entry") {
        callBackUrl = (router.query?.callBackUrl as string) ?? "/dashMO";
    } else {
        callBackUrl = (router.query?.callBackUrl as string) ?? "/";
    }
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
        });
        if (result?.error) {
            setMess(result.error)
        } else {
            router.push(callBackUrl);
        }
    }
  }
  return (
    <>
      <header className={styles.header}>
        <img src="/logo.svg" className={styles.logo} alt="logo" />
        <div className="d-flex flex-column align-items-center mt-2">
            <h1>Welcome</h1>
            <form id="login" onSubmit={handleSubmit}>
                <div className="d-flex">
                    <div className="d-flex flex-column justify-content-center p-2">
                        <label className="my-auto mt-2">User Name</label>
                        <label className="my-auto mt-2">Password</label>
                    </div>
                    <div className="d-flex flex-column justify-content-center p-2">
                        <input className="my-auto mt-2" type="text" id="username" name="username" onChange={(event)=> {
                            setUser(event.target.value)
                        }}></input>
                        <input className="my-auto mt-2" type="password" id="password" name="password" onChange={(event) => {
                            setPass(event.target.value)
                        }}></input>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <input className="btn btn-primary w-75" type="submit" value={`Sign In to ${page}`}></input>
                    <label className={styles.switch}>
                    <input type="checkbox" onChange={() => {
                      if (page === "Balance Sheet") {
                        setPage('Mussel Entry')
                      } else {
                        setPage("Balance Sheet")
                      }
                    }}></input>
                    <span className={`${styles.slider} ${styles.round}`}></span>
                  </label>
                </div>
            </form>
        </div>
        
        <p>
          <code>{mess}</code>
        </p>
      </header>
    </>
  )
}
