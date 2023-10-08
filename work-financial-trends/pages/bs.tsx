import { Nav } from '@/pages/components/Nav'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

import BS, { IBS } from '@/lib/utils/models/bsModel'
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';
import { formatDate } from '@/lib/funcPage';

type Props = {
    bsData: IBS[] ,
    userData: IUSER[]
}

export default function BSpage( {bsData, userData}: Props) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const username = session?.user?.user
    const dataBS = bsData.filter((x) => {
        return x.username === username
    })
    const dataUser = userData.filter((x) => {
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
                            <th>{dataUser[0]?.firstname}'s WI</th>
                            <th>{dataUser[0]?.sfirstname}'s WI</th>
                            <th>Return</th>
                            <th>Opening Balance</th>
                            <th>Closing Balance</th>
                            <th>Weekly Spent</th>
                            <th>Weekly Save</th>
                        </tr>
                    </thead>
                    <thead id='data'>
                        {dataBS.map((x) => (
                            <Fragment key={x.date}>
                                <tr key={formatDate(x.date)}>
                                    <td>{x.date}</td>
                                    <td>{x.fWE.toString()}</td>
                                    <td>{x.sWE.toString()}</td>
                                    <td>{x.return.toString()}</td>
                                    <td>{x.openingBalance.toString()}</td>
                                    <td>{x.closingBalance.toString()}</td>
                                    <td>{x.weeklySpent.toString()}</td>
                                    <td>{x.weeklySave.toString()}</td>
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

    /* find all the data in our database */
    const results = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = results.map((doc) => {
      const pet = JSON.parse(JSON.stringify(doc))
      return pet
    })
  
    return { props: { bsData: bsData, userData: userData } }
}
