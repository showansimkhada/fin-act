// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbars from "./components/navBar"

import BS, { IBS } from '@/lib/utils/models/bsModel'
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { formatDate } from '@/lib/funcPage';
import { useSelector } from 'react-redux';
import { lsUser } from '@/lib/redux';
import { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
    bsData: IBS[] ,
    userData: IUSER[]
}

export default function BSpage( {bsData, userData}: Props) {
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
    const [data, setData] = useState(dataBS);
    const fweTotal = dataBS.reduce((c, x) => c + Number(x.fWI), 0).toFixed(2);
    const sweTotal = dataBS.reduce((c, x) => c + Number(x.sWI), 0).toFixed(2);
    const wspTotal = dataBS.reduce((c, x) => c + Number(x.weeklySpent), 0).toFixed(2);
    const wsaTotal = dataBS.reduce((c, x) => c + Number(x.weeklySave), 0).toFixed(2);
    useEffect (() => {
        setIsClient(true)
    }, [filter])

    function AllData() {
        return (
            <Table id="bsOutput" responsive="sm" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>{isClient? dataUser[0]?.firstname: ''}'s WI</th>
                        <th>{isClient? dataUser[0]?.sfirstname: ''}'s WI</th>
                        <th>Return</th>
                        <th>Opening Balance</th>
                        <th>Closing Balance</th>
                        <th>Weekly Spent</th>
                        <th>Weekly Save</th>
                    </tr>
                </thead>
                <tbody id='data'>
                    {data.map((x) => (
                        <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
                            <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
                            <td>{x.fWI.toString()}</td>
                            <td>{x.sWI.toString()}</td>
                            <td>{x.return.toString()}</td>
                            <td>{x.openingBalance.toString()}</td>
                            <td>{x.closingBalance.toString()}</td>
                            <td>{x.weeklySpent.toString()}</td>
                            <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}
                                <Form action={`api/bs/?type=delete&id=${x._id}`} method='post'>
                                    <button className='border-0 bg-transparent'><FontAwesomeIcon type='submit' icon='trash' color='red'/></button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot id='total'>
                    {isClient ? 
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
                    : ''}
                </tfoot>
            </Table>
        )
    }

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
                'weeklySpent' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'weeklySave' : Number(dataBS.filter(x => x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            arr.push(dataSum);
        }
        return (
            <Table id="bsOutput" responsive="sm" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>{isClient? dataUser[0]?.firstname: ''}'s WI</th>
                        <th>{isClient? dataUser[0]?.sfirstname: ''}'s WI</th>
                        <th>Return</th>
                        <th>Weekly Spent</th>
                        <th>Weekly Save</th>
                    </tr>
                </thead>
                <tbody id='data'>
                    {arr.map((x) => (
                    <tr key={x.year.toString()}>
                        <td>{x.year.toString()}</td>
                        <td>{x.fWI.toString()}</td>
                        <td>{x.sWI.toString()}</td>
                        <td>{x.return.toString()}</td>
                        <td>{x.weeklySpent.toString()}</td>
                        <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    function filterByMonth() {
        let fil = bsData.map(x => x.month).filter((v, i, y) => y.indexOf(v) === i);
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
            let dataSum = ({
                'id': fil[i],
                'month': str,
                'fWI' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'weeklySpent' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'weeklySave' : Number(dataBS.filter(x => x.month === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            arr.push(dataSum);
        }
        arr.sort((a, b) => Number(a.id) - Number(b.id));
        return (
            <Table id="bsOutput" responsive="sm" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>{isClient? dataUser[0]?.firstname: ''}'s WI</th>
                        <th>{isClient? dataUser[0]?.sfirstname: ''}'s WI</th>
                        <th>Return</th>
                        <th>Weekly Spent</th>
                        <th>Weekly Save</th>
                    </tr>
                </thead>
                <tbody id='data'>
                    {arr.map((x) => (
                    <tr key={x.month.toString()}>
                        <td>{x.month.toString()}</td>
                        <td>{x.fWI.toString()}</td>
                        <td>{x.sWI.toString()}</td>
                        <td>{x.return.toString()}</td>
                        <td>{x.weeklySpent.toString()}</td>
                        <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }

    function filterByFiY() {
        {/* 1st April this year to 31st March of next year */}
        // 01/04/2022 - 31/03/2023
        let yr = bsData.map(x => x.year).filter((v, i, y) => y.indexOf(v) === i);
        let fil = bsData.map(x => x.month).filter((v, i, y) => y.indexOf(v) === i);
        let arr = [];
        for (let i = 0; i < yr.length; i++) {
            let dataSum = ({
                'year': yr[i],
                'fWI' : Number(dataBS.filter(x => formatDate(x.year.toString() + x.month.toString() + x.date.toString(), 1) > formatDate('01/04/'+yr[i], 1)).reduce((a, v) => a + Number(v.fWI), 0).toFixed(2)),
                'sWI' : Number(dataBS.filter(x => Number(x.month) > 3 && x.year === fil[i]).reduce((a, v) => a + Number(v.sWI), 0).toFixed(2)),
                'return' : Number(dataBS.filter(x => Number(x.month) > 3 && x.year === fil[i]).reduce((a, v) => a + Number(v.return), 0).toFixed(2)),
                'weeklySpent' : Number(dataBS.filter(x => Number(x.month) > 3 && x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySpent), 0).toFixed(2)),
                'weeklySave' : Number(dataBS.filter(x => Number(x.month) > 3 && x.year === fil[i]).reduce((a, v) => a + Number(v.weeklySave), 0).toFixed(2))
            });
            arr.push(dataSum);
        }
        arr.sort((a, b) => Number(a.year) - Number(b.year));
        return (
            <Table id="bsOutput" responsive="sm" className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Ficial Date</th>
                        <th>{isClient? dataUser[0]?.firstname: ''}'s WI</th>
                        <th>{isClient? dataUser[0]?.sfirstname: ''}'s WI</th>
                        <th>Return</th>
                        <th>Weekly Spent</th>
                        <th>Weekly Save</th>
                    </tr>
                </thead>
                <tbody id='data'>
                    {arr.map((x) => (
                    <tr key={x.year.toString()}>
                        <td>{'01/04/'+ x.year.toString()}</td>
                        <td>{x.fWI.toString()}</td>
                        <td>{x.sWI.toString()}</td>
                        <td>{x.return.toString()}</td>
                        <td>{x.weeklySpent.toString()}</td>
                        <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        )
    }

    function checkfilter() {
        if (filter === 0) {
            return AllData();
        } else if (filter === 1) {
            return filterByYear()
        } else if (filter === 2) {
            return filterByMonth()
        }
        return filterByFiY()
    }
    return (
        <div>
            <Navbars/>
            <div id="filter" style={{marginTop: "60px"}}>
                <label>Filter the data by</label>
                <input type='button' value='Year' onClick={() => {
                    setFilter(1);
                    }}/>
                <input type='button' value='Monthly' onClick={() => {
                    setFilter(2);
                }}/>
                <input type='button' value='Fisial Year' onClick={() => {
                    setFilter(3);
                }}/>
                <input type='button' value='Clear' onClick={() => {
                    setFilter(0);
                }}/>
            </div>
            <div className="table-responsive-sm">
                {isClient? checkfilter(): ''}
            </div>
        </div>
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
