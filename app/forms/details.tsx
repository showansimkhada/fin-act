'use client';

import { Button } from '@/components/button';

export function Details(user: any) {
  return (
    <form action={''}>
      <input id='username' name='username' defaultValue={user.username} hidden readOnly/>
      <div className='profile'>
        <div>
          <label>First Name</label>
          <label>Last Name</label>
          <label>Partner's First Name</label>
          <label>Partner's Last Name</label>
        </div>
        <div>
          <input type='text' name='firstName' required={true} 
            placeholder={user.firstName}/>
          <input type='text' name='lastName' required={true} 
            placeholder={user.lastName}/>
          <input type='text' name='partnerFirstName' required={true} 
            placeholder={user.partnerFirstName}/>
          <input type='text' name='partnerLastName' required={true} 
            placeholder={user.partnerLastName}/>
        </div>
        <Button type='submit'>Update Details</Button>
      </div>
    </form>
  )
}
