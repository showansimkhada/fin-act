'use client';

import { Button } from '@/components/button';

export function Pass(user: any) {
  return (
    <form action={''}>
      <div className='flex flex-row mt-[2px]'>
        <div className='flex flex-col leading-[2.75] left-0 justify-start w-[35vw]'>
          <label>Old Password</label>
          <label>New Password</label>
          <label>Confirm Password</label>
        </div>
        <div className='flex flex-col right-0 justify-end'>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='password' id='oldpass' name='oldpass' autoComplete='current-password' required={true}/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='password' id='newpass' name='newpass' autoComplete='new-password' required={true}/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='password' id='confirmpass' name='confirmpass' autoComplete='new-password' required={true}/>
        </div>  
      </div>
      <Button type='submit' className='rounded-2xl bg-blue-500 w-full h-8 hover:bg-orange-300 mt-[2px]'>Update Password</Button> 
    </form>
  )
}