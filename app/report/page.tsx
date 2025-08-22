import { auth } from '@/actions/auth';
import { findUser } from '@/actions/users';
import {Lines} from '@/charts/line'
import { fetchBS } from '@/actions/bs';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const dataUser = await findUser(user!);
  const bsData = await fetchBS(user);

  return (
    <>
      <Suspense>
        <Lines data={[bsData, dataUser!]}/>
      </Suspense>
    </>
  )
}