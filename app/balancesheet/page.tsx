import { fetchBS } from '@/api/bs'
import { fetchDetails } from '@/api/users';
import { formatDate } from '@/lib/utils';
import { auth } from '@/api/auth';

export default async function Page() {
  const session = await auth();
  const user = session?.user?.name;
  const me = await fetchDetails(user!);
  const bs = await fetchBS(user);
  const fweTotal = bs.reduce((a, v) => a + Number(v.fWI), 0).toFixed(2);
  const sweTotal = bs.reduce((a, v) => a + Number(v.sWI), 0).toFixed(2);
  const wspTotal = bs.reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2);;
  const wsaTotal = bs.reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2);;
  return (
    <>
      <table>
        <thead>
          <tr className=''>
            <th className=''>Date</th>
            <th className=''>{me?.firstName}'s WI</th>
            <th className=''>{me?.partnerFirstName}'s WI</th>
            <th className=''>Return</th>
            <th className=''>Opening Balance</th>
            <th className=''>Closing Balance</th>
            <th className=''>Weekly Spent</th>
            <th className=''>Weekly Save</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(odd)]:bg-white'>
          {bs?.map((x) => (
            <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
              <td className=''>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
              <td className=''>{x.fWI}</td>
              <td className=''>{x.sWI}</td>
              <td className=''>{x.return}</td>
              <td className=''>{x.openingBalance}</td>
              <td className=''>{x.closingBalance}</td>
              <td className=''>{x.weeklySpent}</td>
              <td className=''>{x.weeklySave}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className=''>{'Total'}</td>
            <td className=''>{fweTotal}</td>
            <td className=''>{sweTotal}</td>
            <td className=''></td>
            <td className=''></td>
            <td className=''></td>
            <td className=''>{wspTotal}</td>
            <td className=''>{wsaTotal}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}