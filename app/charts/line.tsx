'use client'
import { Button } from '@/components/button';
import { LineProps } from '@/lib/definitions';

import {
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useState } from 'react';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var options = {
  maintainaspectratio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    }
  },
  scales: {}
};

export function Lines(data: LineProps) {
  const [filter, setFilter] = useState(1)
  const bsData = data.data[0];
  const dataUser = data.data[1];

  function filterByYear() {
    // return type should be JSX element
    let fil = bsData.map(x => x.year).filter((v, i, y) => y.indexOf(v) === i);
    let arr = [];
    for (let i = 0; i < fil.length; i++) {
      let dataSum = ({
        'year': fil[i],
        'fWI' : Number(bsData.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
        'sWI' : Number(bsData.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
        'return' : Number(bsData.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
        'yearlySpent' : Number(bsData.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
        'yearlySave' : Number(bsData.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
      });
      arr.push(dataSum);
    }
    const labels = arr.map(x => x.year)
    const dataLine = {
      labels,
      datasets: [
        {
          label: `${dataUser.firstname}'s Ficial Year Income'`,
          data: arr.map(x => x.fWI),
          backgroundColor: 'rgb(135, 206, 235)',
          borderColor: 'rgba(135, 206, 235, 0.5)',
        },
        {
          label: `${dataUser.sfirstname}'s Ficial Year Income'`,
          data: arr.map(x => x.sWI),
          backgroundColor: 'rgb(255, 165, 0)',
          borderColor: 'rgba(255, 165, 0, 0.5)',
        },
        {
          label: 'Yearly Spent',
          data: arr.map(x => x.yearlySpent),
          backgroundColor: 'rgb(255, 255, 0)',
          borderColor: 'rgba(255, 255, 0, 0.5)',
        },
        {
          label: 'Yearly Saved',
          data: arr.map(x => x.yearlySave),
          backgroundColor: 'rgb(0, 128, 0)',
          borderColor: 'rgba(0, 128, 0, 0.5)'
        }
      ],
    };

    options.scales = {
      x: {
        max: arr.reduce((a, v) => Math.max(a, v.fWI, v.sWI), 0),
      }
    }

    return (
      <Line options={options} data={dataLine}/>
    )
  }

  function filterByMonth() {
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
      let str = '';
      switch (fil[i]) {
        case 1:
          str = 'January'
          break;
        case 2:
          str = 'February'
          break;
        case 3: 
          str = 'March'
          break;
        case 4:
          str = 'April'
          break;
        case 5:
          str = 'May'
          break;
        case 6:
          str = 'June'
          break;
        case 7:
          str = 'July'
          break;
        case 8:
          str = 'August'
          break;
        case 9: 
          str = 'September'
          break;
        case 10:
          str = 'October'
          break;
        case 11:
          str = 'November'
          break;
        case 12:
          str = 'December'
          break;
        }
      arr.push({
        'month': Number(fil[i]),
        'id': str,
        'fWI' : Number(bsData.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
        'sWI' : Number(bsData.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
        'return' : Number(bsData.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
        'monthlyspent' : Number(bsData.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
        'monthlysave' : Number(bsData.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
      });
    }
    arr.sort((a, b) => Number(a.month) - Number(b.month));

    const labels = arr.map(x => x.id)
    const dataLine = {
      labels,
      datasets: [
        {
          label: `${dataUser.firstname}'s Ficial Year Income'`,
          data: arr.map(x => x.fWI),
          backgroundColor: 'rgb(135, 206, 235)',
          borderColor: 'rgba(135, 206, 235, 0.5)'
        },
        {
          label: `${dataUser.sfirstname}'s Ficial Year Income'`,
          data: arr.map(x => x.sWI),
          backgroundColor: 'rgb(255, 165, 0)',
          borderColor: 'rgba(255, 165, 0, 0.5)'
        },
        {
          label: 'Monthly Spent',
          data: arr.map(x => x.monthlyspent),
          backgroundColor: 'rgb(255, 255, 0)',
          borderColor: 'rgba(255, 255, 0, 0.5)'
        },
        {
          label: 'Monthly Save',
          data: arr.map(x => x.monthlysave),
          backgroundColor: 'rgb(0, 128, 0)',
          borderColor: 'rgba(0, 128, 0, 0.5)'
        }
      ],
    };

    options.scales = {
      x: {
        max: arr.reduce((a, v) => Math.max(a, v.fWI, v.sWI), 0),
      }
    }

    return (
      <Line options={options} data={dataLine}/>
    )
  }

  function filterByFiY() {
    {/* 1st April this year to 31st March of next year */}
    // 01/04/2022 - 31/03/2023
    let yr = bsData.map(x => x.year).filter((v, i, y) => y.indexOf(v) === i);
    let arr = [];
    for (let i = 0; i < yr.length; i++) {
      let dataSum1 = ({
        'year': yr[i],
        'fWI' : Number(bsData.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
        'sWI' : Number(bsData.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
        'return' : Number(bsData.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
        'yeralySpent' : Number(bsData.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
        'yearlySave' : Number(bsData.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
      });
      let dataSum2 = ({
        'year': Number(yr[i])+1,
        'fWI' : Number(bsData.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
        'sWI' : Number(bsData.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
        'return' : Number(bsData.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
        'yeralySpent' : Number(bsData.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
        'yearlySave' : Number(bsData.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
      });
      let dataSum = ({
        'year': '01/04/' + dataSum1.year + ' to ' + '31/03/' + dataSum2.year,
        'fWI': dataSum1.fWI + dataSum2.fWI,
        'sWI': dataSum1.sWI + dataSum2.sWI,
        'return': dataSum1.return + dataSum2.return,
        'yeralySpent': dataSum1.yeralySpent + dataSum2.yeralySpent,
        'yearlySave': dataSum1.yearlySave + dataSum2.yearlySave
      })
      arr.push(dataSum);
    }
    arr.sort((a, b) => Number(a.year) - Number(b.year));
    const labels = arr.map(x => x.year)
    const dataLine = {
      labels,
        datasets: [
        {
          label: `${dataUser.firstname}'s Ficial Year Income'`,
          data: arr.map(x => x.fWI),
          backgroundColor: 'rgb(135, 206, 235)',
          borderColor: 'rgba(135, 206, 235, 0.5)'
        },
        {
          label: `${dataUser.sfirstname}'s Ficial Year Income'`,
          data: arr.map(x => x.sWI),
          backgroundColor: 'rgb(255, 165, 0)',
          borderColor: 'rgba(255, 165, 0, 0.5)'
        },
        {
          label: 'Ficial Yearl Spent',
          data: arr.map(x => x.yeralySpent),
          backgroundColor: 'rgb(255, 255, 0)',
          borderColor: 'rgba(255, 255, 0, 0.5)'
        },
        {
          label: 'Ficial Yearl Saved',
          data: arr.map(x => x.yearlySave),
          backgroundColor: 'rgb(0, 128, 0)',
          borderColor: 'rgba(0, 128, 0, 0.5)'
        }
      ],
    };

    options.scales = {
      x: {
        max: arr.reduce((a, v) => Math.max(a, v.fWI, v.sWI), 0),
      }
    }

    return (
      <Line options={options} data={dataLine}/>
    )
  }

  function checkfilter() {
    if (filter === 1) {
      return filterByYear()
    } else if (filter === 2) {
      return filterByMonth()
    }
    return filterByFiY()
  }

  return (
    <div className='flex flex-row -mt-[400px]  bg-gray-700'>
      <div className=''>
        {checkfilter()}
        <div className='flex flex-row'>
          <Button className='rounded-2xl bg-blue-500 w-[33vw] h-8 hover:bg-orange-300 mb-[5px] mt-[3px]' type='button' onClick={() => {
            setFilter(2);
          }}>Monthly</Button>
          <Button className='rounded-2xl bg-blue-500 w-[33vw] h-8 hover:bg-orange-300 mb-[5px] mt-[3px]' type='button' onClick={() => {
            setFilter(1);
          }}>Yearly</Button>
          <Button className='rounded-2xl bg-blue-500 w-[33vw] h-8 hover:bg-orange-300 mb-[5px] mt-[3px]' type='button' onClick={() => {
            setFilter(3);
          }}>Ficial Year</Button>
        </div>
      </div>
    </div>
  );
}