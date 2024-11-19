'use client'
import Navbars from "@/pages/components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate, stringAmt, sumAmt } from "@/lib/funcPage";
import BS, { IBS } from "@/lib/utils/models/bsModel";
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    userData: IUSER[],
    bsData: IBS[]
}

export default function HomeDash({ userData, bsData}: Props ) {
    // clean up the codes
    const username = String(useSelector(lsUser))
    const [isClient, setIsClient] = useState(false)

    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })

    // For balance data entry
    const [amt, setAmt] = useState('0')
    const [total, setTotal] = useState('0')
    const [today, setToday] = useState(formatDate(Date(), 0));
    const [fWI, setFWI] = useState('0')
    const [sWI, setSWI] = useState('0')
    const [ret, setRET] = useState('0')
    const [cB, setCB] = useState('0')
    const [wSP, setWSP] = useState('0')
    const [wSA, setWSA] = useState('0')
    const [oB, setOB] = useState('0')

    const dataUser = userData.filter((x) => {
        return x.username === username
    })

    const fN = dataUser.map((x) => x.firstname)[0];

    const dataBs = bsData.filter((x) => {
        return x.username === username
    })

    var filtData = dataBs.reverse().slice(0, 5).reverse()
    const getCB = filtData.slice(4,5)
    const closingBalance = getCB.map((x) => {
        return x.closingBalance
    })

    useEffect(() => {
        setIsClient(true)
    }, [today])

    useEffect(() => {
        setOB(String(closingBalance))
        sumBS()
    }, [amt, fWI, sWI, ret, wSP, wSA, cB, oB, total])

    // BS
    function weeklySpent() {
        let a = (parseFloat(String(fWI)) + parseFloat(String(sWI)) + parseFloat(String(ret)) + parseFloat(String(oB)) - parseFloat(String(cB))).toFixed(2)
        setWSP(String(parseFloat(a)))
    }

    // BS
    function weeklySave() {
        let a = (parseFloat(String(cB)) - parseFloat(String(oB)) - parseFloat(String(ret))).toFixed(2)
        setWSA(String(parseFloat(a)))
    }

    // BS
    function sumBS() {
        setCB(String(parseFloat(total)))
        weeklySpent()
        weeklySave()
    }

    if (isClient) {
        return (
            <div className="container-fluid">
                <Navbars/>
                <div id="bs">
                    <form action={`api/bs/?username=${username}`} method="POST">
                        <div className="d-flex mt-5 pt-2">
                            <Table striped bordered id="bsOutput" responsive="sm">
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
                                <tbody>
                                    {filtData.map((x) => (
                                        <tr key={formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}>
                                            <td>{formatDate(x.year.toString() + '/' + x.month.toString() + '/' + x.date.toString(), 1)}</td>
                                            <td>{x.fWI.toString()}</td>
                                            <td>{x.sWI.toString()}</td>
                                            <td>{x.return.toString()}</td>
                                            <td>{x.openingBalance.toString()}</td>
                                            <td>{x.closingBalance.toString()}</td>
                                            <td>{x.weeklySpent.toString()}</td>
                                            <td className="d-flex flex-row justify-content-between">{x.weeklySave.toString()}
                                                <Form action={`api/bs/?type=deleteD&id=${x._id}`} method='post'>
                                                    <button className='border-0 bg-transparent'><FontAwesomeIcon type='submit' icon='trash' color='red'/></button>
                                                </Form>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <input type="date" name="bsDate" id="bsDate" className="w-100" value={today} onChange={(event) => {
                                                setToday(event.target.value)
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="fWI" id="fWI" className="w-100" value={fWI} onChange={(event) => {
                                                let input = event.target.value
                                                if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setFWI(input);
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="sWI" id="sWI" className="w-100" value={sWI} onChange={(event) => {
                                                let input = event.target.value
                                                if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setSWI(input);
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="ret" id="ret" className="w-100" value={ret} onChange={(event) => {
                                                let input = event.target.value
                                                if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setRET(input);
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="oB" id="oB" className="w-100 border-0 p-0" value={oB} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="cB" id="cB" className="w-100 border-0 p-0" value={cB} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="wSp" id="wSp" className="w-100 border-0 p-0" value={wSP} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="wSa" id="wSa" className="w-100 border-0 p-0" value={wSA} readOnly></input>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                        <div className="d-flex table-responsive-sm pl-5 pr-5">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Amount <span style={{fontWeight: 2, fontSize: 12, color: 'red'}}>(separate the amount by ',')</span></th>
                                        <th>Addition expression</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input id="go" value={amt} onChange={(event) => {
                                                let input = event.target.value
                                                if (!input) {
                                                    event.target.select()
                                                }
                                                setAmt(input)
                                                setTotal(String(parseFloat(String(sumAmt(input)))))
                                            }}></input>
                                        </td>
                                        <td>
                                            <label>{stringAmt(amt)}</label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <input className="table btn btn-primary w-25" type="submit" value="Submit"></input>
                        </div>
                    </form>
                </div>
            </div>
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
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(a.year.toString() + '-' + a.month.toString() + '-' + a.date.toString()).getTime() - new Date(b.year.toString() + '-' + b.month.toString() + '-' + b.date.toString()).getTime()
    });
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = data.map((doc) => {
      const bsData = JSON.parse(JSON.stringify(doc))
      return bsData
    })

    /* find all the data in our database */
    const findUser = await User.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const userData = findUser.map((doc) => {
      const userData = JSON.parse(JSON.stringify(doc))
      return userData
    })
  
    return { props: { bsData: bsData, userData: userData } }
}