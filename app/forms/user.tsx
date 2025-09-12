'use client';

import { updateUN } from '@/api/actions';
import { Button } from '@/components/button';

export function User(user: any) {
  return (
    <form action={updateUN}>
      <div className=''>
        <div className=''>
          <label>Username</label>
        </div>
        <div className=''>
          <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
          <input className=''
            id='newUsername' name='newUsername' required={true} placeholder={user.username}/>
        </div>
      </div>
      <Button type='submit' className=''>Update Username</Button>
    </form>
  )
}