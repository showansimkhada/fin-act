import type { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/layout.module.css'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const IndexPage: NextPage = () => {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [mess, setMess] = useState('')
  const router = useRouter();
  const callBackUrl = (router.query?.callBackUrl as string) ?? "/bs";
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
    <div className={styles.container}>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                    <input className="btn btn-primary w-75" type="submit" value="Sign In"></input>
                    <label>Please Sign In</label>
                </div>
            </form>
        </div>
        
        <p>
          <code>{mess}</code>
        </p>
        <span>
          <span>Learn </span>
          <a
            className={styles.link}
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className={styles.link}
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className={styles.link}
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}

export default IndexPage
