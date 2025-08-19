import { fetchUser, fetchBS } from '../lib/data'
import { formatDate } from "../lib/utils";
import { auth } from '../actions/auth';

export default async function Page() {
  const session = await auth()
  const user = session?.user?.data?.username;
  const me = await fetchUser(user);
  const bs = await fetchBS(me.username);
  return (
    <>
      <main>
        <div className="bs-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>{me?.firstname}'s WI</th>
                <th>{me?.sfirstname}'s WI</th>
                <th>Return</th>
                <th>Opening Balance</th>
                <th>Closing Balance</th>
                <th>Weekly Spent</th>
                <th>Weekly Save</th>
              </tr>
            </thead>
            <tbody>
              {bs?.map((x) => (
                <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
                  <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
                  <td>{x.fWI.toString()}</td>
                  <td>{x.sWI.toString()}</td>
                  <td>{x.return.toString()}</td>
                  <td>{x.openingBalance.toString()}</td>
                  <td>{x.closingBalance.toString()}</td>
                  <td>{x.weeklySpent.toString()}</td>
                  <td>{x.weeklySave.toString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {<tr>
                <td>{'Total'}</td>
                <td>{'fweTotal'}</td>
                <td>{'sweTotal'}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{'wspTotal'}</td>
                <td>{'wsaTotal'}</td>
              </tr>}
            </tfoot>
          </table>
        </div>
      </main>
    </>
  )
}