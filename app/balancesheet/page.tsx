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
          <tr>
            <th>Date</th>
            <th>{me?.firstName}&apos;s WI</th>
            <th>{me?.partnerFirstName}&apos;s WI</th>
            <th>Return</th>
            <th>Opening Balance</th>
            <th>Closing Balance</th>
            <th>Weekly Spent</th>
            <th>Weekly Save</th>
          </tr>
        </thead>
        <tbody className='[&>*:nth-child(odd)]:bg-white'>
          {bs?.map((x) => (
            <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
              <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
              <td>{x.fWI}</td>
              <td>{x.sWI}</td>
              <td>{x.return}</td>
              <td>{x.openingBalance}</td>
              <td>{x.closingBalance}</td>
              <td>{x.weeklySpent}</td>
              <td>{x.weeklySave}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>{'Total'}</td>
            <td>{fweTotal}</td>
            <td>{sweTotal}</td>
            <td></td>
            <td></td>
            <td></td>
            <td>{wspTotal}</td>
            <td>{wsaTotal}</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}