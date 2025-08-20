'use client';

import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { addBS } from '@/actions/bs';
import { formatDate, stringAmt, sumAmt } from '@/lib/utils';

export function Dash(data: any) {
  const bs = data.data.data;
  const user = data.data.user;
  const [amt, setAmt] = useState('0')
  const [today, setToday] = useState(formatDate(Date(), 0));
  const [fWI, setFWI] = useState(0)
  const [sWI, setSWI] = useState(0)
  const [ret, setRET] = useState(0)
  const [cB, setCB] = useState(0)
  const [wSP, setWSP] = useState(0)
  const [wSA, setWSA] = useState(0)
  const [oB, setOB] = useState(0)

  const closingBalance = bs.closingBalance;
  useEffect(() => {
    setOB(closingBalance);
  }, [today])

  useEffect(() => {
    setWSP(() =>{
      let a = (parseFloat(String(fWI)) + parseFloat(String(sWI)) + parseFloat(String(ret)) + parseFloat(String(oB)) - parseFloat(String(cB))).toFixed(2)
      if (parseFloat(a) < 0) {
          return 0
      } else {
          return parseFloat(a)
      }
    })
    setWSA(() =>{
      let a = (parseFloat(String(cB)) - parseFloat(String(oB)) - parseFloat(String(ret))).toFixed(2)
      if (parseFloat(a) < 0) {
          return 0
      } else {
          return parseFloat(a)
      }
    })
  }, [fWI, sWI, ret, cB, wSA, wSP])
  
  return (
    <>
      <form action={addBS}>
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
          <div className='value-a'>
            <input name="username" defaultValue={user} readOnly hidden/>
            <input type="date" name="bsDate" value={today} onChange={(event) => {
              setToday(event.target.value)
            }}/>
            <input type="number" name="fWI" value={fWI} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setFWI(input);
            }}/>
            <input type="number" name="sWI" value={sWI} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setSWI(input);
            }}/>
            <input type="number" name="ret" value={ret} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setRET(input);
            }}/>
            <input type="number" name="oB" value={oB} readOnly/>
            <input type="number" name="cB" value={cB} readOnly/>
            <input type="number" name="wSp" value={wSP} readOnly/>
            <input type="number" name="wSa" value={wSA} readOnly/>
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
							<input id="amt" value={amt} onChange={(event) => {
								let input = event.target.value;
								if (input) {
									setAmt(input)
									let x = sumAmt(input);
									setCB(parseFloat(x))
								} else {
									setAmt('0')
									setCB(0)
								}
							}}/>
							<label>{stringAmt(amt.toString())}</label>
						</div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </>
  )
}