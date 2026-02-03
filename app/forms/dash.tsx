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
          <div className='dashL'>
            <div className='dashH'>
              <div className='dashT'>Date</div>
              <input className='dashI' type='date' name='bsDate' value={today} onChange={(event) => {
                setToday(event.target.value)
              }}/>
            </div>
            <div className='dashH'>
              <div className='dashT'>Income</div>
              <div className='dashLa'>
                <div>{user.firstName}&apos;s Weekly Income</div>
                <div>{user.partnerFirstName}&apos;s Weekly Income</div>
              </div>
              <div className='dashI'>
                <input type='number' name='fWI' value={fWI} 
                  onFocus={e => e.target.select()} onChange={(event) => {
                    const input = parseFloat(event.target.value);
                    setFWI(input);
                  }}/>
                <input type='number' name='sWI' 
                  onFocus={e => e.target.select()} value={sWI} onChange={(event) => {
                    const input = parseFloat(event.target.value);
                    setSWI(input);
                  }}/>
              </div>
            </div>
            <div className='dashH'>
              <div className='dashT'>Return</div>
              <input className='dashI' type='number' name='ret' 
                onFocus={e => e.target.select()} value={ret} onChange={(event) => {
                  const input = parseFloat(event.target.value);
                  setRET(input);
                }}/>
            </div>
            <div className='dashH'>
              <div className='dashT'>Balance</div>
              <div className='dashLa'>
                <div>Opening Balance</div>
                <div>Closing Balance</div>
              </div>
              <div className='dashLa'>
                <input type='number' name='oB' value={oB} readOnly/>
                <input type='number' name='cB' value={cB} readOnly/>
              </div>
            </div>
            <div className='dashH'>
              <div className='dashT'>Summary</div>
              <div className='dashLa'>
                <div>Weekly Save</div>
                <div>Weekly Spent</div>
              </div>
              <div className='dashLa'>
                <input type='number' name='wSp' value={wSP} readOnly/>
                <input type='number' name='wSa' value={wSA} readOnly/>
              </div>
            </div>
          </div>
          <div className='dashR'>
            {stringAmt(amt.toString()).numbers.map((x) => (
            <div className="mathExp" key={x.sign + " " + x.amt}>
              <label className='leftExp'>{x.sign}</label>
              <label className='rightExp'>{x.amt}</label>
            </div>
          ))}
          <input id='amt' value={amt} type="text"
                onFocus={e => e.target.select()} onChange={(event) => {
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
          <div className='mathExp'>
            <div className='leftExp'>=</div>
            <div className='rightExp'>{stringAmt(amt.toString()).sum}</div>
          </div>
          </div>
          <div className='dashBtn'>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </>
  )
}