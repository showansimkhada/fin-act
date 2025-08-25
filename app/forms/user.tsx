'use client';

import { updateUN } from '@/api/actions';
import { Button } from '@/components/button';

export function User(user: any) {
  return (
    <form action={updateUN}>
      <div className='flex flex-row p-0 ml-[5px] mr-[5px] justify-between'>
        <div className='flex flex-col leading-[2.23em] items-start'>
          <label>Username</label>
        </div>
        <div className='flex flex-col right-0 justify-end'>
          <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            id='newUsername' name='newUsername' required={true} placeholder={user.username}/>
        </div>
      </div>
      <Button type='submit' className='mt-[3px] rounded-[20px] text-black items-center content-center bg-blue-500 w-full h-[30px] hover:bg-orange-300'>Update Username</Button>
    </form>
  )
}