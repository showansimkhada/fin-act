'use client';

import { Button } from '@/components/button';

export function Pass(user: any) {
  return (
    <form action={''}>
      <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
      <div className='profile'>
        <div className='profileLabel'>
          <label>Old Password</label>
          <label>New Password</label>
          <label>Confirm Password</label>
        </div>
        <div className='profileInput'>
          <input className=''
            type='password' id='oldPass' name='oldPass' autoComplete='current-password' required={true}/>
          <input className=''
            type='password' id='newPass' name='newPass' autoComplete='new-password' required={true}/>
          <input className=''
            type='password' id='confirmPass' name='confirmPass' autoComplete='new-password' required={true}/>
        </div>
        <Button type='submit' className='profileSubmit'>Update Password</Button> 
      </div>
    </form>
  )
}