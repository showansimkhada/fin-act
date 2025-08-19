import { fetchLastBS, fetchUser } from "@/app/lib/data";
import { formatDate } from "@/app/lib/utils";
import { createBS } from "@/app/lib/actions";
import { Button } from "../ui/button";
import { auth } from '@/app/actions/auth'

export default async function Page() {
  const session = await auth()
  const user = session?.user?.name;
  const me = await fetchUser(user);
  const bs = await fetchLastBS(user);
  const today = formatDate(Date(), 0);
  return (
    <>
    <form action={createBS}>
      <div className="dash-a">
        <div className="label-a">
          <label>
            Date
          </label>
          <label>
            Firstname&apos;s WI
          </label>
          <label>
            Second Firstname&apos;s WI
          </label>
          <label>
            Return
          </label>
          <label>
            Opening Balance
          </label>
          <label>
            Closing Balance
          </label>
          <label>
            Weekly Spent
          </label>
          <label>
            Weekly Save
          </label>
        </div>
        <div className="value-a">
          <input type="text" name="username" id="username" defaultValue={'finact'} readOnly hidden/>
          <input type="date" name="bsDate" id="bsDate" value={today} readOnly/>
          <input name="fWI" id="fWI"  value={bs?.fWI}/>
          <input name="sWI" id="sWI" value={bs?.sWI}/>
          <input name="ret" id="ret" value={bs?.return}/>
          <input name="oB" id="oB" value={bs?.openingBalance} readOnly/>
          <input name="cB" id="cB" value={bs?.closingBalance} readOnly/>
          <input name="wSp" id="wSp" value={bs?.weeklySpent} readOnly/>
          <input name="wSa" id="wSa" value={bs?.weeklySave} readOnly/>
        </div>
      </div>
      <div className='dash-b'>
        <div className='label-b'>
          <label>
            Amount
          </label>
          <label>
            Addition expression
          </label>
        </div>
        <div className='value-b'>
          <input id="amt" /*value={amt} onChange={(event) => {
            let input = event.target.value;
            // if (input) {
            //   setAmt(input)
            //   let x = sumAmt(input);
            //   setCB(x)
            // } else {
            //   setAmt('0')
            //   setCB('0')
            // }
          }}*//>
          <label>amt{/*stringAmt(amt)*/}</label>
        </div>
      </div>
      <Button type="submit">Submit</Button>
      </form>
    </>
  )
}