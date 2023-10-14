import { useSession } from "next-auth/react";
import Navbars from "./components/navBar"
import { redirect } from "next/navigation";

export default function Profile() {
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })

    return (
        <>
        <Navbars />
        <div className="d-flex flex-column align-items-start justify-content-center mt-5 pt3">
            <form action="/profile/user" method="post" className="border border-5 w-100">
                <div className="d-flex align-items-center justify-content-between align-conten-between w-100">
                    <div className="w-50">
                        <label>User Name</label>
                    </div>
                    <div className="w-50">
                        <input type="string" id="username" className="w-75" name="username" autoCapitalize="none"></input>
                    </div>
                    <div>
                        <input type="submit" className="btn btn-primary" value="Update"></input>
                    </div>
                </div>
            </form>
            <form action='/profile/details' method="post" className="border border-5 w-100">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-between align-content-between w-50">
                        <label className="mt-1">First Name</label>
                        <label className="mt-1">Last Name</label>
                        <label className="mt-1">Partner's First Name</label>
                        <label className="mt-1">Partner's Last Name</label>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-between align-content-between w-50">
                        <input type="text" id="firstname" className="w-75" name="firstname" autoCapitalize="none"></input>
                        <input type="text" id="lastname" className="w-75" name="lastname" autoCapitalize="none"></input>
                        <input type="text" id="sfirstname" className="w-75" name="sfirstname" autoCapitalize="none"></input>
                        <input type="text" id="slastname" className="w-75" name="slastname" autoCapitalize="none"></input>
                    </div>
                    <div className="d-flex">
                        <input type="submit" className="btn btn-primary" value="Update Profile"></input>
                    </div>
                </div>
            </form>
            <form action='/profile/update-password' method="post" className="border border-5 w-100">
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column justify-content-between align-context-between w-50">
                        <label>Old Password</label>
                        <label>New Password</label>
                        <label>Confirm Password</label>
                    </div>
                    <div className="d-flex flex-column align-items-center justify-content-betweeen align-content-between w-50">
                        <input type="password" id="oldpass" name="oldpass" className="mt-2 w-75"></input>
                        <input type="password" id="newpass" name="newpass" className="mt-2 w-75"></input>
                        <input type="password" id="confirmpass" name="confirmpass" className="mt-2 w-75"></input>
                    </div>
                    <div className="d-flex">
                        <input type="submit" id="passup" className="btn btn-primary" value="Update Password"></input>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}