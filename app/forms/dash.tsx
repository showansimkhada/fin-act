'use client';

import { Button } from '@/components/button';
import { useEffect, useState } from 'react';
import { addBS } from '@/api/bs';
import { formatDate, stringAmt, sumAmt } from '@/lib/utils';

export function Dash(data: any) {
  const bs = data.data.data;
  const user = data.data.username;
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
        <input name='username' defaultValue={user.username} readOnly hidden/>
        <div className='dash'>
          <div className='dashLabel'>
            <label>
              Date
            </label>
            <label>
              {user.firstname}&apos;s WI
            </label>
            <label>
              {user.sfirstname}&apos;s WI
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
            <label>
              Sum of Amounts
            </label>
          </div>
          <div className='dashInput'>
            <input className=''
            type='date' name='bsDate' value={today} onChange={(event) => {
              setToday(event.target.value)
            }}/>
            <input className=''
            type='number' name='fWI' value={fWI} onFocus={e => e.target.select()} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setFWI(input);
            }}/>
            <input className=''
            type='number' name='sWI' onFocus={e => e.target.select()} value={sWI} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setSWI(input);
            }}/>
            <input className=''
            type='number' name='ret' onFocus={e => e.target.select()} value={ret} onChange={(event) => {
              let input = parseFloat(event.target.value);
              setRET(input);
            }}/>
            <input className=''
            type='number' name='oB' value={oB} readOnly/>
            <input className=''
            type='number' name='cB' value={cB} readOnly/>
            <input className=''
            type='number' name='wSp' value={wSP} readOnly/>
            <input className=''
            type='number' name='wSa' value={wSA} readOnly/>
            <input className=''
                id='amt' value={amt} onFocus={e => e.target.select()} onChange={(event) => {
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
          </div>
          <div className='dashExp'>
            {/* {stringAmt(amt.toString())} */}
            {stringAmt(amt.toString()).numbers.map((x) => (
              <div className="mathExp">
                <label className='leftExp'>{x.exp}</label>
                <label className='rightExp'>{x.amt}</label>
              </div>
            ))}
            <label className='sumExp'>{stringAmt(amt.toString()).sum}</label>
          </div>
          <div className='dashBtn'>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </>
  )
}