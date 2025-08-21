'use client';

import { updateUN } from '@/actions/users';
import { Button } from '@/components/button';

export function Profile(user: any) {
  return (
    <div className="profile">
      <form action={updateUN} method="post">
        <div className="profile-update">
          <div className="profile-label">
            <label>Username</label>
          </div>
          <div className="profile-value">
            <input id="username" name='username' defaultValue={user.username} hidden readOnly/>
            <input id="newUsername" name="newUsername" required={true} placeholder={user.username}/>
          </div>
        </div>
        <Button type="submit" className="btn">Update Profile</Button>
      </form>
      <form action={''} method="post">
        <div className="profile-update">
          <div className="profile-label">
            <label>First Name</label>
            <label>Last Name</label>
            <label>Partner's First Name</label>
            <label>Partner's Last Name</label>
          </div>
          <div className="profile-value">
            <input type="text" id="firstname" name="firstname" required={true} placeholder={user.firstname}/>
            <input type="text" id="lastname" name="lastname" required={true} placeholder={user.lastname}/>
            <input type="text" id="sfirstname" name="sfirstname" required={true} placeholder={user.sfirstname}/>
            <input type="text" id="slastname" name="slastname" required={true} placeholder={user.slastname}/>
          </div>
        </div>
        <Button type="submit" className="btn">Update Profile</Button>
      </form>
      <form action={''} method="post">
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
      <Button type="submit" className="btn">Update Password</Button>
      </form>
    </div>
  )
}