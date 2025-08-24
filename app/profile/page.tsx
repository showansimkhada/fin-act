import { auth } from '@/api/auth';
import { User } from '@/forms/user'
import { Details } from '@/forms/details'
import { fetchDetails, fetchPass, fetchUN } from '@/api/users';
import { Pass } from '@/forms/pass';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const me = await fetchUN(user);
  const pass = await fetchPass(user);
  const det = await fetchDetails(user)
  return (
    <>
      <User {...me}/>
      <Details {...det}/>
      <Pass {...pass}/>
    </>
  )
}