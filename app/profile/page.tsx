import { auth } from '@/actions/auth';
import { User } from '@/forms/user'
import { Details } from '@/forms/details'
import { Suspense } from 'react';
import { findUser } from '@/actions/users';
import { Pass } from '@/forms/pass';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const me = await findUser(user!);
  return (
    <>
      <Suspense>
        <User {...me}/>
        <Details {...me}/>
        <Pass {...me}/>
      </Suspense>
    </>
  )
}