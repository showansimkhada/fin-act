import Navbars from "@/components/navBar"

import BS, { IBS } from '@/lib/utils/models/bsModel'
import User, { IUSER } from '@/lib/utils/models/userModel'
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate } from '@/lib/funcPage';
import { lsUser } from '@/lib/redux';

import { GetServerSideProps } from "next";
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

type Props = {
    bsData: IBS[] ,
    userData: IUSER[]
}

export default function( {bsData, userData}: Props) {
    const [isClient, setIsClient] = useState(false);
    const router = useRouter()
    useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
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
    })

    const dataTable = (
            <Table striped bordered id="bsOutput" responsive="sm" className="table table-bordered table-hover">
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
                    {isClient? data.map((x) => (
                      <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
                      <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
                      <td>{x.fWI.toString()}</td>
                      <td>{x.sWI.toString()}</td>
                      <td>{x.return.toString()}</td>
                      <td>{x.openingBalance.toString()}</td>
                      <td>{x.closingBalance.toString()}</td>
                      <td>{x.weeklySpent.toString()}</td>
                      <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}</td>
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
    )

    return (
        <div className='container-fluid'>
            <Navbars/>
            <div className="d-flex flex-row justify-content-between table-responsive-sm" style={{marginTop: '55px'}}>
            </div>
            {dataTable}
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