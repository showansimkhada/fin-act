'use client';

import { Button } from '@/components/button';

export function Details(user: any) {
  return (
    <form action={''}>
      <div className='flex flex-row'>
        <div className='flex flex-col leading-[2.75] left-0 justify-start w-[35vw]'>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Partner's First Name</label>
          <label>Partner's Last Name</label>
        </div>
        <div className='flex flex-col justify-start right-0'>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='text' id='firstname' name='firstname' required={true} placeholder={user.firstname}/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='text' id='lastname' name='lastname' required={true} placeholder={user.lastname}/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='text' id='sfirstname' name='sfirstname' required={true} placeholder={user.sfirstname}/>
          <input className='w-full bg-white rounded-[5px] p-[10px] mb-[2px]'
            type='text' id='slastname' name='slastname' required={true} placeholder={user.slastname}/>
        </div>
      </div>
      <Button type='submit' className='rounded-2xl bg-blue-500 w-full h-8 hover:bg-orange-300 mt-[3px] mb-[2px]'>Update Details</Button>
    </form>
  )
}
