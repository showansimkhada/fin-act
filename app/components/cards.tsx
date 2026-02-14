'use client'
import { Props } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { getMonth } from "@/lib/utils";

export default function Card(data: Props) {
  // Setting the filter value for income or saving or expense or tax.
  const [reportT, setReportT] = useState(0);
  const [activeBT, setActiveBT] = useState('incomeBtn');
  const [activeBY, setActiveBY] = useState('');

  // Balance sheet data.
  const bsData = data.data[0];

  // Taxes data
  const taxData = data.data[2];
  const yeas = [...new Set(taxData.map(x => x.year).sort())];
  const [yea, setYea] = useState(0);
  const taxYear = taxData.filter(x => x.year == yea);

  // Getting unique year and setting the default value.
  const years = [...new Set(bsData.map(x => x.year).sort())];
  const [year, setYear] = useState(0);
  const bsYear = bsData.filter(x => x.year == year);

  // User data
  const dataUser = data.data[1];

  function loadData(str: String) {
    // Saving
    if (str === 'sav') {
      let fil = bsYear.map(x => x.month).filter((v, i, y) => y.indexOf(v) === i);
      type arr = {
        id: string;
        month: number;
        monthlySave: number;
      }
      let arr = [];
      for (let i = 0; i < fil.length; i++) {
        const str = getMonth(fil[i]);
        arr.push({
          'month': Number(fil[i]),
          'id': str,
          'monthlySave' : Number(bsYear.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
        });
      }
      arr.sort((a, b) => Number(a.month) - Number(b.month));
      return (
        <>
          {yearFilter(years)}
          <div className="cardDetail">
            <div className="cardList">
              {arr?.map((x) => (
                <div className="cardMonthIncome" key={x.id.toString()}>
                  <div>{x.id}</div>
                  <div>{x.monthlySave}</div>
                </div>
              ))}
            </div>
            <div className="cardBrief">
              <p>Average savings per month {(arr.reduce((a, v) => a + Number(v.monthlySave), 0)/12).toFixed(2)}</p>
            </div>
          </div>
        </>
      )
    } 
    // Expenses
    else if (str === 'exp') {
      let fil = bsYear.map(x => x.month).filter((v, i, y) => y.indexOf(v) === i);
      type arr = {
        id: string;
        month: number;
        weeklySpent: number;
      }
      let arr = [];
      for (let i = 0; i < fil.length; i++) {
        const str = getMonth(fil[i]);
        arr.push({
          'month': Number(fil[i]),
          'id': str,
          'monthlySpent' : Number(bsYear.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2))
        });
      }
      arr.sort((a, b) => Number(a.month) - Number(b.month));
      return (
        <>
          {yearFilter(years)}
          <div className="cardDetail">
            <div className="cardList">
              {arr?.map((x) => (
                <div className="cardMonthIncome" key={x.id.toString()}>
                  <div>{x.id}</div>
                  <div>{x.monthlySpent}</div>
                </div>
              ))}
            </div>
            <div className="cardBrief">
              <p>Average expenses per month {(arr.reduce((a, v) => a + Number(v.monthlySpent), 0)/12).toFixed(2)}</p>
            </div>
          </div>
        </>
      )
    }
    // Taxes 
    else if (str === 'tax') {
      let fil = [...new Set(taxYear.map(x => x.employer))];
      type arr = {
        grossAmount: number;
        payeDeduced: number;
        employer: string;
      }
      let arr = [];
      for (let i = 0; i < fil.length; i++) {
        arr.push({
          'employer': fil[i],
          'payeDeduced' : Number(taxYear.filter(x => x.employer === fil[i]).reduce((a, v) => a + Number(v.payeDeduced), 0).toFixed(2)),
          'grossAmount' : Number(taxYear.filter(x => x.employer === fil[i]).reduce((a, v) => a + Number(v.grossAmount), 0).toFixed(2)),
        });
      }
      return (
        <>
          {taxYearFilter(yeas)}
          <div className="cardDetail">
            <div className="cardList">
              {arr?.map((x) => (
                <div className="cardListD" key={x.employer.toString()}>
                  <h1>{x.employer}</h1>
                  <div className="cardListDT">
                    <div className="cardTax">
                      <p>PAYE Deducted</p>
                      <p>{x.payeDeduced}</p>
                    </div>
                    <div className="cardTax">
                      <p>Gross Amount</p>
                      <p>{x.grossAmount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    } 
    // Income default
    else {
      let fil = bsData.map(x => x.month).filter((v, i, y) => y.indexOf(v) === i);
      type arr = {
        id: string;
        month: number;
        fWI: number;
        sWI: number;
        return: number;
        weeklySpent: number;
        weeklySave: number;
      }
      let arr = [];
      for (let i = 0; i < fil.length; i++) {
        const str = getMonth(fil[i]);
        arr.push({
          'month': Number(fil[i]),
          'id': str,
          'fWI' : Number(bsYear.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
          'sWI' : Number(bsYear.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2))
        });
      }
      arr.sort((a, b) => Number(a.month) - Number(b.month));
      return (
        <>
          {yearFilter(years)}
          <div className="cardDetail">
            <div className="cardList">
              <div className="cardName">{dataUser.firstName}</div>
              {arr?.map((x) => (
                <div className="cardMonthIncome" key={x.id}>
                  <div>{x.id}</div>
                  <div>{x.fWI}</div>
                </div>
              ))}
            </div>
            <div className="cardList">
              <div className="cardName">{dataUser.partnerFirstName}</div>
              {arr?.map((x) => (
                <div className="cardMonthIncome" key={x.id}>
                  <div>{x.id}</div>
                  <div>{x.sWI}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    }
  }

  // Filter to load the Income, Savings and Expenses
  function checkType() {
    switch (reportT) {
      case 0:
        return (
          <>
            {loadData('inc')}
          </>
        )
      case 1:
        return (
          <>
            {loadData('sav')}
          </>
        )
      case 2:
        return (
          <>
            {loadData('exp')}
          </>
        )
      case 3:
        return (
          <>
            {loadData('tax')}
          </>
        )
    }
  }

  function yearFilter(arr: number[]) {
    if (year === 0 || year < years[0]) {
      setActiveBY(years[years.length-1].toString());
      setYear(years[years.length-1]);
      document.getElementById(activeBY)?.setAttribute('style', `background-color: blue; color: white;`);
    }
    return (
      <div className="cardYear"> {
        arr.map(x =>
          <Button id={x.toString()} className='btnY' type='button' key={x.toString()} onClick={() => {
            setActiveBY(x.toString())
            setYear(x);
          }}>{x}</Button>
        )
      }
      </div>
    )
  }

  function taxYearFilter(arr: number[]) {
    if (yea === 0 || yea < yeas[0]) {
      setActiveBY(yeas[yeas.length-1].toString());
      setYea(yeas[yeas.length-1]);
      document.getElementById(activeBY)?.setAttribute('style', `background-color: blue; color: white;`);
    }
    return (
      <div className="cardYear">{
        arr.map(x => 
          <Button id={x.toString()} className='btnY' type='button' key={x.toString()} onClick={() => {
            setYea(x)
            setActiveBY(x.toString())
          }}>{x}</Button>
        )
      }
      </div>
    )
  }

  useEffect(() => {
    if (yea > 0 || year > 0) {
      document.querySelectorAll('.btnT').forEach(x => x.setAttribute('style', `background-color: white; color: black;`));
      document.querySelectorAll('.btnY').forEach(x => x.setAttribute('style', `background-color: white; color: black;`));
      document.getElementById(activeBT)?.setAttribute('style', `background-color: blue; color: white;`);
      document.getElementById(activeBY)?.setAttribute('style', `background-color: blue; color: white;`);
    }
  }, [activeBT, activeBY, year, yea, years, yeas]);

  return (
    <div className="card">
      {checkType()}
      <div className="cardType">
        <Button className='btnT' id='incomeBtn' type='button' onClick={() => {
          setReportT(0);
          setYear(0);
          setActiveBT('incomeBtn');
        }}>Income</Button>
        <Button className='btnT' id='savingBtn' type='button' onClick={() => {
          setReportT(1);
          setYear(0);
          setActiveBT('savingBtn');
        }}>Savings</Button>
        <Button className='btnT' id='expenseBtn' type='button' onClick={() => {
          setReportT(2);
          setYear(0);
          setActiveBT('expenseBtn');
        }}>Expenses</Button>
        <Button className='btnT' id='taxBtn' type='button' onClick={() => {
          setReportT(3);
          setYea(0)
          setActiveBT('taxBtn');
        }}>Taxes</Button>
      </div>
    </div>
  );
}