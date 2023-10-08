import { Nav } from '@/pages/components/Nav'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import MO, { IMO } from '@/lib/utils/models/moModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import { formatDate } from '@/lib/funcPage';

type Props = {
    moData: IMO[] 
}

export default function MOpage( {moData}: Props) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const username = session?.user?.data?.username
    const data = moData.filter((x) => {
        return x.username === username
    })
    return (
        <div>
            <Nav/>
            <div className="table-responsive-sm" style={{marginTop: "60px"}}>
                <table id="bsOutput" className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Weekdays</th>
                            <th>Spot</th>
                            <th>First Shift</th>
                            <th>Second Shift</th>
                            <th>Third Shift</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <thead>
                        {data.map((x) => (
                            <Fragment key={x.date}>
                                <tr key={formatDate(x.date)}>
                                    <th style={{fontWeight: "normal"}}>{x.date}</th>
                                    <th style={{fontWeight: "normal"}}>{x.weekday}</th>
                                    <th style={{fontWeight: "normal"}}>{x.spot.toString()}</th>
                                    <th style={{fontWeight: "normal"}}>{x.fShift.toString()}</th>
                                    <th style={{fontWeight: "normal"}}>{x.sShift.toString()}</th>
                                    <th style={{fontWeight: "normal"}}>{x.tShift.toString()}</th>
                                    <th style={{fontWeight: "normal"}}>{x.total.toString()}</th>
                                </tr>
                            </Fragment>
                        ))}
                    </thead>
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await BS.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = result.map((doc) => {
      const pet = JSON.parse(JSON.stringify(doc))
      return pet
    })
  
    return { props: { bsData: bsData } }
}