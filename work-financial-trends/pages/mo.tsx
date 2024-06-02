// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbars from "./components/navBar"

import MO, { IMO } from '@/lib/utils/models/moModel'
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
    moData: IMO[] 
}

export default function MOpage( {moData}: Props) {
    const [isClient, setIsClient] = useState(false)
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const username = String(useSelector(lsUser))
    const data = moData.filter((x) => {
        return x.username === username
    })

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (isClient) {
        return (
            <>
            <Navbars/>
            <div style={{marginTop: "60px"}}>
                <Table striped bordered hover id="bsOutput" >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weekdays</th>
                            <th>Spot</th>
                            <th>D1</th>
                            <th>D2</th>
                            <th>D3</th>
                            <th>Total</th>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <thead>
                        {data.map((x) => (
                            <tr key={formatDate(x.date)}>
                                <td>{x.date}</td>
                                <td>{x.weekday}</td>
                                <td>{x.spot.toString()}</td>
                                <td>{x.fShift.toString()}</td>
                                <td>{x.sShift.toString()}</td>
                                <td>{x.tShift.toString()}</td>
                                <td>{x.total.toString()}</td>
                                <td className="d-flex flex-row justify-content-between">
                                    <Form action={`api/mo/?type=delete&id=${x._id}`} method='post'>
                                        <button className='border-0 bg-transparent'><FontAwesomeIcon type='submit' icon='trash' color='red'/></button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                    </thead>
                </Table>
            </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findMO = await MO.find({});
    const data = findMO.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
    });

  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const moData = data.map((doc) => {
      const moData = JSON.parse(JSON.stringify(doc))
      return moData
    })
  
    return { props: { moData: moData } }
}