'use client';

import { Button } from '@/components/button';

export function Details(user: any) {
  return (
    <form action={''}>
      <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
      <div className='profile'>
        <div className='profileLabel'>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Partner's First Name</label>
          <label>Partner's Last Name</label>
        </div>
        <div className='profileInput'>
          <input className=''
            type='text' name='firstName' required={true} placeholder={user.firstname}/>
          <input className=''
            type='text' name='lastName' required={true} placeholder={user.lastname}/>
          <input className=''
            type='text' name='partnerFirstName' required={true} placeholder={user.sfirstname}/>
          <input className=''
            type='text' name='partnerLastName' required={true} placeholder={user.slastname}/>
        </div>
        <Button type='submit' className='profileSubmit'>Update Details</Button>
      </div>
    </form>
  )
}
