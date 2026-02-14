import { auth } from '@/api/auth';
import { fetchDetails } from '@/api/users';
import { fetchBS } from '@/api/bs';
import { Suspense } from 'react';
import { fetchTax } from '@/api/tax';
import Cards from '@/components/cards';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const dataUser = await fetchDetails(user!);
  const bsData = await fetchBS(user);
  const taxData = await fetchTax(user);

  return (
    <>
      <Suspense>
        <Cards data={[bsData, dataUser!, taxData]} />
      </Suspense>
    </>
  )
}