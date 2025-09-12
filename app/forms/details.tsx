'use client';

import { Button } from '@/components/button';

export function Details(user: any) {
  return (
    <form action={''}>
      <div className=''>
        <div className=''>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Partner's First Name</label>
          <label>Partner's Last Name</label>
        </div>
        <div className=''>
          <input className=''
            type='text' id='firstname' name='firstname' required={true} placeholder={user.firstname}/>
          <input className=''
            type='text' id='lastname' name='lastname' required={true} placeholder={user.lastname}/>
          <input className=''
            type='text' id='sfirstname' name='sfirstname' required={true} placeholder={user.sfirstname}/>
          <input className=''
            type='text' id='slastname' name='slastname' required={true} placeholder={user.slastname}/>
        </div>
      </div>
      <Button type='submit' className=''>Update Details</Button>
    </form>
  )
}
