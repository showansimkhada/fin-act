import { fetchUser } from '../lib/data';
import { Button } from '../ui/button';
import { updatePass, updateProfile, updateUN } from '../lib/actions';
import { auth } from '../actions/auth';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const me = await fetchUser(user);
  return (
    <>
      <div className="profile">
        <form action={updateUN} method="post">
          <div className="profile-update">
            <div className="profile-label">
              <label>Username</label>
            </div>
            <div className="profile-value">
              <input id="username" name='username' defaultValue={me.username} hidden readOnly/>
              <input id="newUsername" name="newUsername" required={true} placeholder={me?.username}/>
            </div>
          </div>
          <Button type="submit" className="btn">Update Profile</Button>
        </form>
        <form action={updateProfile} method="post">
          <div className="profile-update">
            <div className="profile-label">
              <label>First Name</label>
              <label>Last Name</label>
              <label>Partner's First Name</label>
              <label>Partner's Last Name</label>
            </div>
            <div className="profile-value">
              <input type="text" id="firstname" name="firstname" required={true} placeholder={me?.firstname}/>
              <input type="text" id="lastname" name="lastname" required={true} placeholder={me?.lastname}/>
              <input type="text" id="sfirstname" name="sfirstname" required={true} placeholder={me?.sfirstname}/>
              <input type="text" id="slastname" name="slastname" required={true} placeholder={me?.slastname}/>
            </div>
          </div>
          <Button type="submit" className="btn">Update Profile</Button>
        </form>
        <form action={updatePass} method="post">
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
    </>
  )
}