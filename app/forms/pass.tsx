'use client';

import { Button } from '@/components/button';

export function Pass(user: any) {
  return (
    <form action={''}>
      <div className='flex flex-row p-0 mt-[5px] ml-[5px] mr-[5pxpx] justify-between'>
        <div className='flex flex-col leading-[2.24em] items-start'>
          <label>Old Password</label>
          <label>New Password</label>
          <label>Confirm Password</label>
        </div>
        <div className='flex flex-col right-0 justify-end'>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='password' id='oldpass' name='oldpass' autoComplete='current-password' required={true}/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='password' id='newpass' name='newpass' autoComplete='new-password' required={true}/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='password' id='confirmpass' name='confirmpass' autoComplete='new-password' required={true}/>
        </div>  
      </div>
      <Button type='submit' className='mt-[3px] rounded-[20px] text-black items-center content-center bg-blue-500 w-full h-[30px] hover:bg-orange-300'>Update Password</Button> 
    </form>
  )
}