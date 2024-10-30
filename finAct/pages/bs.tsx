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
    const [isClient, setIsClient] = useState(false)
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
    const fweTotal = dataBS.reduce((c, x) => c + Number(x.fWE), 0).toFixed(2);
    const sweTotal = dataBS.reduce((c, x) => c + Number(x.sWE), 0).toFixed(2)
    const wspTotal = dataBS.reduce((c, x) => c + Number(x.weeklySpent), 0).toFixed(2)
    const wsaTotal = dataBS.reduce((c, x) => c + Number(x.weeklySave), 0).toFixed(2)
    let s = '';
    useEffect (() => {
        setIsClient(true)
    }, [])

    return (
        <div>
            <Navbars/>
            <div id="filter" style={{marginTop: "60px"}}>
                <label>Filter the data by</label>
                <input type='button' value='Year' onClick={() => {}}/>
                <input type='button' value='Monthly' onClick={() => {}}/>
                <input type='button' value='Year' onClick={() => {}}/>
            </div>
            <div className="table-responsive-sm">
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
                        {isClient? dataBS.map((x) => (
                            <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString())}>
                                <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString())}</td>
                                <td>{x.fWE.toString()}</td>
                                <td>{x.sWE.toString()}</td>
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
                        )): ''}
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
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(formatDate(a.date.toString() + '/' + a.month.toString() + '/' + a.year.toString())).getTime() - new Date(formatDate(b.date.toString() + '/' + b.month.toString() + '/' + b.year.toString())).getTime()
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
