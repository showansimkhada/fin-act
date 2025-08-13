'use client'
import { useSession } from "next-auth/react";
import Navbars from "@/components/nav-bar"
import { useRouter } from "next/navigation";
import dbConnect from "@/lib/utils/conn/mongoose";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { useEffect, useState } from "react";

type Props = {
    userData: IUSER[]
}

export default function Profile ({userData}: Props) {
    const [isClient, setIsClient] = useState(false)
    const router = useRouter()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        }
    })
    useEffect(() => {
        setIsClient(true)
    }, [])

    const username = String(useSelector(lsUser))
    const dataUser = userData.filter((x) => {
        return x.username === username
    })

    const profileJSX = (
        <>
        	<Navbars />
			<div className="profile">
                <form action={`api/profile/?username=${username}&type=details`} method="post">
                    <div className="profile-update">
                        <div className="profile-label">
                            <label>User Name</label>
                            <label>First Name</label>
                            <label>Last Name</label>
                            <label>Partner's First Name</label>
                            <label>Partner's Last Name</label>
                        </div>
                        <div className="profile-value">
                            <input id="username" name="newUsername" required={true} placeholder={dataUser[0]?.username}/>
                            <input type="text" id="firstname" name="firstname" required={true} placeholder={dataUser[0]?.firstname}/>
                            <input type="text" id="lastname" name="lastname" required={true} placeholder={dataUser[0]?.lastname}/>
                            <input type="text" id="sfirstname" name="sfirstname" required={true} placeholder={dataUser[0]?.sfirstname}/>
                            <input type="text" id="slastname" name="slastname" required={true} placeholder={dataUser[0]?.slastname}/>
                        </div>
                    </div>
					<input type="submit" className="btn" value="Update Profile"/>
                </form>
                <form action={`api/profile/?username=${username}&type=password`} method="post">
                    <div className="pass-update">
                        <div className="pass-label">
                            <label>Old Password</label>
                            <label>New Password</label>
                            <label>Confirm Password</label>
                        </div>
                        <div className="pass-value">
                            <input type="password" id="oldpass" name="oldpass" autoComplete="current-password" required={true}/>
                            <input type="password" id="newpass" name="newpass" autoComplete="new-password" required={true}/>
                            <input type="password" id="confirmpass" name="confirmpass" autoComplete="new-password" required={true}/>
                        </div>
                    </div>
					<input type="submit" id="passup" className="btn" value="Update Password"/>
                </form>
            </div>
        </>
    )

    return (
        <>
        	{isClient? profileJSX : ''}
        </>
    )
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