'use client';

import { Button } from '@/components/button';

export function Details(user: any) {
  return (
    <form action={''}>
      <div className='flex flex-row p-0 mt-[5px] ml-[5px] mr-[5px] justify-between'>
        <div className='flex flex-col leading-[2.24em] items-start'>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Partner's First Name</label>
          <label>Partner's Last Name</label>
        </div>
        <div className='flex flex-col right-0 justify-end'>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='text' id='firstname' name='firstname' required={true} placeholder={user.firstname}/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='text' id='lastname' name='lastname' required={true} placeholder={user.lastname}/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='text' id='sfirstname' name='sfirstname' required={true} placeholder={user.sfirstname}/>
          <input className='w-[30vw] bg-white rounded-[5px] p-[5px] mb-[2px]'
            type='text' id='slastname' name='slastname' required={true} placeholder={user.slastname}/>
        </div>
      </div>
      <Button type='submit' className='mt-[3px] rounded-[20px] text-black items-center content-center bg-blue-500 w-full h-[30px] hover:bg-orange-300'>Update Details</Button>
    </form>
  )
}
