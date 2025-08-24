'use client';

import { updateUN } from '@/api/actions';
import { Button } from '@/components/button';

export function User(user: any) {
  return (
    <form action={updateUN}>
      <div className='flex flex-row w-screen'>
        <div className='flex flex-col leading-[2.75] left-0 justify-start w-[35vw]'>
          <label>Username</label>
        </div>
        <div className='flex flex-col right-0 justify-end'>
          <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            id='newUsername' name='newUsername' required={true} placeholder={user.username}/>
        </div>
      </div>
      <Button type='submit' className='rounded-2xl bg-blue-500 w-full h-8 hover:bg-orange-300 mb-[5px] mt-[3px]'>Update Username</Button>
    </form>
  )
}