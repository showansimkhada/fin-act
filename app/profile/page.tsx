import { auth } from '@/actions/auth';
import { Profile } from '@/forms/profile'
import { Suspense } from 'react';
import { finUser } from '@/actions/users';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const me = await finUser(user!);
  // const bs = {
  //   username: me?.username,
  //   firstname: me?.firstname,
  //   lastname: me?.lastname,
  //   sfirstname: me?.sfirstname,
  //   slastname: me?.slastname,
  // }
  return (
    <>
      <Suspense>
        <Profile {...me}/>
      </Suspense>
    </>
  )
}