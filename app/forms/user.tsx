'use client';

import { updateUN } from '@/api/actions';
import { Button } from '@/components/button';

export function User(user: any) {
  return (
    <form action={updateUN}>
      <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
      <div className='profile'>
        <div className='profileLabel'>
          <label>Username</label>
        </div>
        <div className='profileInput'>
          <input className=''
            id='newUsername' name='newUsername' required={true} placeholder={user.username}/>
        </div>
        <Button type='submit' className='profileSubmit'>Update Username</Button>
      </div>
    </form>
  )
}