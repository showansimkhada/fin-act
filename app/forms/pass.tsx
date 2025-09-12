'use client';

import { Button } from '@/components/button';

export function Pass(user: any) {
  return (
    <form action={''}>
      <div className=''>
        <div className=''>
          <label>Old Password</label>
          <label>New Password</label>
          <label>Confirm Password</label>
        </div>
        <div className=''>
          <input className=''
            type='password' id='oldpass' name='oldpass' autoComplete='current-password' required={true}/>
          <input className=''
            type='password' id='newpass' name='newpass' autoComplete='new-password' required={true}/>
          <input className=''
            type='password' id='confirmpass' name='confirmpass' autoComplete='new-password' required={true}/>
        </div>  
      </div>
      <Button type='submit' className=''>Update Password</Button> 
    </form>
  )
}