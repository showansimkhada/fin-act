// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbars from "./components/navBar"

import BS, { IBS } from '@/lib/utils/models/bsModel'
import User, { IUSER } from '@/lib/utils/models/userModel'
import dbConnect from "@/lib/utils/conn/mongoose";
import { lsUser } from '@/lib/redux';

import { GetServerSideProps } from "next";
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend} 
    from 'chart.js';
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

type Props = {
    bsData: IBS[] ,
    userData: IUSER[]
}

export default function Report( {bsData, userData}: Props) {
    const [isClient, setIsClient] = useState(false);
    const [filter, setFilter] = useState(0);
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const username = String(useSelector(lsUser))
    const dataBS = bsData.filter((x) => {
        return x.username === username
    })
    const dataUser = userData.filter((x) => {
        return x.username === username
    })
    useEffect (() => {
        setIsClient(true)
    }, [filter])

    // Add average income, average spent, average saved, max income, max spent, max saved, min income, min spent, min saved

    function filterByYear() {
        // return type should be JSX element
        let fil = bsData.map(x => x.year).filter((v, i, y) => y.indexOf(v) === i);
        let arr = [];
        for (let i = 0; i < fil.length; i++) {
            let dataSum = ({
                'year': fil[i],
                'fWI' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'yearlySpent' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'yearlySave' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            arr.push(dataSum);
        }
        const labels = arr.map(x => x.year)
        const dataLine = {
            labels,
            datasets: [
              {
                label: dataUser[0]?.firstname + "'s Yearly Income",
                data: arr.map(x => x.fWI),
                backgroundColor: 'rgb(135, 206, 235)',
                borderColor: 'rgba(135, 206, 235, 0.5)'
              },
              {
                label: dataUser[0]?.sfirstname + "'s Yearly Income",
                data: arr.map(x => x.sWI),
                backgroundColor: 'rgb(255, 165, 0)',
                borderColor: 'rgba(255, 165, 0, 0.5)'
              },
              {
                label: 'Yearly Spent',
                data: arr.map(x => x.yearlySpent),
                backgroundColor: 'rgb(255, 255, 0)',
                borderColor: 'rgba(255, 255, 0, 0.5)'
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
                'fWI' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'monthlyspent' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'monthlysave' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
        }
        arr.sort((a, b) => Number(a.month) - Number(b.month));

        const labels = arr.map(x => x.id)
        const dataLine = {
            labels,
            datasets: [
              {
                label: dataUser[0]?.firstname + "'s Monthly Income",
                data: arr.map(x => x.fWI),
                backgroundColor: 'rgb(135, 206, 235)',
                borderColor: 'rgba(135, 206, 235, 0.5)'
              },
              {
                label: dataUser[0]?.sfirstname + "'s Monthly Income",
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
                'fWI' : Number(dataBS.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'yeralySpent' : Number(dataBS.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'yearlySave' : Number(dataBS.filter(x => x.year == yr[i] && (Number(x.month) > 3)).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            let dataSum2 = ({
                'year': Number(yr[i])+1,
                'fWI' : Number(dataBS.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'yeralySpent' : Number(dataBS.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'yearlySave' : Number(dataBS.filter(x => Number(x.year) == Number(yr[i])+1 && Number(x.month) < 4).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            let dataSum = ({
                'year': '01/04/' + dataSum1.year + " to " + '31/03/' + dataSum2.year,
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
                label: dataUser[0]?.firstname + "'s Ficial Year Income",
                data: arr.map(x => x.fWI),
                backgroundColor: 'rgb(135, 206, 235)',
                borderColor: 'rgba(135, 206, 235, 0.5)'
              },
              {
                label: dataUser[0]?.sfirstname + "'s Ficial Year Income",
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
        <>
            <div className='container-fluid'>
                <Navbars/>
                <div id="chartLine" style={{marginTop: '55px'}}>
                    {isClient? checkfilter(): ''}
                    <div className="d-flex align-items-end" style={{marginLeft: '2.5%', marginRight: '2.5%'}}>
                    <input className="w-50" type='button' value='Monthly' onClick={() => {
                        setFilter(2);
                    }}/>
                    <input className="w-50" type='button' value='Yearly' onClick={() => {
                        setFilter(1);
                    }}/>
                    <input className="w-50" type='button' value='Fiscal Year' onClick={() => {
                        setFilter(3);
                    }}/>
                </div>
                </div>
            </div>
            <footer>
                
            </footer>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(a.year.toString() + '-' + a.month.toString() + '-' + a.date.toString()).getTime() - new Date(b.year.toString() + '-' + b.month.toString() + '-' + b.date.toString()).getTime()
    });
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = data.map((doc) => {
      const pet = JSON.parse(JSON.stringify(doc))
      return pet
    })

    /* find all the data in our database */
    const results = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = results.map((doc) => {
      const pet = JSON.parse(JSON.stringify(doc))
      return pet
    })
  
    return { props: { bsData: bsData, userData: userData } }
}