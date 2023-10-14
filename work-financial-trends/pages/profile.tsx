import { useSession } from "next-auth/react";
import Navbars from "./components/navBar"
import { redirect } from "next/navigation";
import dbConnect from "@/lib/utils/conn/mongoose";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { useEffect, useState } from "react";

type Props = {
    userData: IUSER[]
}

export default function Profile({userData}: Props) {
    const [isClient, setIsClient] = useState(false)
    const [accty, setAccTy] = useState('')
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })

    const username = String(useSelector(lsUser))
    const dataUser = userData.filter((x) => {
        return x.username === username
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return (
            <>
            <Navbars />
            <div className="d-flex flex-column align-items-start justify-content-center mt-5 pt3">
                <form action="" method="" className="border border-5 w-100">
                    <div className="d-flex align-items-center justify-content-between align-conten-between w-100">
                        <div className="w-50">
                            <label>User Name</label>
                        </div>
                        <div className="w-50">
                            <label id="username" className="w-75">{dataUser[0].username}</label>
                        </div>
                        <div>
                            <input type="submit" className="btn btn-primary" value="Update" hidden></input>
                        </div>
                    </div>
                </form>
                <form action={`api/profile/?username=${username}&type=details`} method="post" className="border border-5 w-100">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column justify-content-between align-content-between w-50">
                            <label className="mt-1">First Name</label>
                            <label className="mt-1">Last Name</label>
                            <label className="mt-1">Partner's First Name</label>
                            <label className="mt-1">Partner's Last Name</label>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-between align-content-between w-50">
                            <input type="text" id="firstname" className="w-75" name="firstname" autoCapitalize="none" value={dataUser[0].firstname}></input>
                            <input type="text" id="lastname" className="w-75" name="lastname" autoCapitalize="none" value={dataUser[0].lastname}></input>
                            <input type="text" id="sfirstname" className="w-75" name="sfirstname" autoCapitalize="none" value={dataUser[0].sfirstname}></input>
                            <input type="text" id="slastname" className="w-75" name="slastname" autoCapitalize="none" value={dataUser[0].slastname}></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-content-end w-100">
                        <input type="submit" className="btn btn-primary" value="Update Profile"></input>
                    </div>
                </form>
                <form action={`api/profile/?username=${username}&type=account&array=${accty}`} method="post" className="border border-5 w-100">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column justify-content-between align-content-between w-50">
                            <label>Account Types</label>
                            <ol>
                                {dataUser[0].account.map((x) => (
                                    <li>{x}</li>
                                ))}
                            </ol>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-between align-content-between w-50">
                            <input type="text" className="w-75" onChange={(event) => {
                                setAccTy(event.target.value)
                            }}></input>
                            <input type="submit" formMethod="post" className="btn btn-primary w-75" value="Add"></input>
                            <input type="submit" formAction={`api/profile/?username=${username}&type=accountRem&array=${accty}`} className="btn btn-primary w-75" value="Remove"></input>
                        </div>
                    </div>
                </form>
                <form action={`api/profile/?username=${username}&type=password`} method="post" className="border border-5 w-100">
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column justify-content-between align-context-between w-50">
                            <label className="mt-1">Old Password</label>
                            <label className="mt-1">New Password</label>
                            <label className="mt-1">Confirm Password</label>
                        </div>
                        <div className="d-flex flex-column align-items-center justify-content-betweeen align-content-between w-50">
                            <input type="password" id="oldpass" name="oldpass" autoComplete="current-password" className="mt-2 w-75"></input>
                            <input type="password" id="newpass" name="newpass" autoComplete="new-password" className="mt-2 w-75"></input>
                            <input type="password" id="confirmpass" name="confirmpass" autoComplete="new-password" className="mt-2 w-75"></input>
                        </div>
                    </div>
                    <div className="d-flex flex-column align-content-end w-100">
                        <input type="submit" id="passup" className="btn btn-primary" value="Update Password"></input>
                    </div>
                </form>
            </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findUser = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = findUser.map((doc) => {
      const userData = JSON.parse(JSON.stringify(doc))
      return userData
    })
  
    return { props: { userData: userData } }
}