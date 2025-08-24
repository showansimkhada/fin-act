import { auth } from '@/api/auth';
import { fetchDetails } from '@/api/users';
import {Lines} from '@/charts/line'
import { fetchBS } from '@/api/bs';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const dataUser = await fetchDetails(user!);
  const bsData = await fetchBS(user);

  return (
    <>
      <Suspense>
        <Lines data={[bsData, dataUser!]}/>
      </Suspense>
    </>
  )
}