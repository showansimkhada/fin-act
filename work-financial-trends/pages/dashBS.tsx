'use client'
import Navbars from "@/pages/components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate } from "@/lib/funcPage";
import BS, { IBS } from "@/lib/utils/models/bsModel";
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { Table } from "react-bootstrap";

type Props = {
    userData: IUSER[],
    bsData: IBS[]
}

export default function HomeBS({ userData, bsData }: Props ) {
    const [isClient, setIsClient] = useState(false)
    const [loadData, setLoadData] = useState(false)
    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const [goBal, setGoBal] = useState('0')
    const [onBal, setOnBal] = useState('0')
    const [serBal, setSerBal] = useState('0')
    const [total, setTotal] = useState(0)
    const [today, setToday] = useState(formatDate(Date()))
    const [fWI, setFWI] = useState('0')
    const [sWI, setSWI] = useState('0')
    const [ret, setRET] = useState('0')
    const [cB, setCB] = useState(0)
    const [wSP, setWSP] = useState(0)
    const [wSA, setWSA] = useState(0)
    const [oB, setOB] = useState(0)
    
  const username = String(useSelector(lsUser))
    const dataUser = userData.filter((x) => {
        return x.username === username
    })
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
        handleDate()
    }, [username, goBal, onBal, serBal, fWI, sWI, ret, wSP, wSA, today, cB, oB])

    function weeklySpent() {
        let a = (parseFloat(String(fWI)) + parseFloat(String(sWI)) + parseFloat(String(ret)) + parseFloat(String(oB)) - parseFloat(String(cB))).toFixed(2)
        setWSP(parseFloat(a))
    }

    function weeklySave() {
        let a = (parseFloat(String(cB)) - parseFloat(String(oB)) - parseFloat(String(ret))).toFixed(2)
        setWSA(parseFloat(a))
    }

    function sumBS() {
        let x = (parseFloat(String(goBal)) + parseFloat(String(onBal)) + parseFloat(String(serBal))).toFixed(2)
        setTotal(parseFloat(x))
        if (!loadData) {
            setCB(parseFloat(x))
        }
        weeklySpent()
        weeklySave()
    }

    function handleDate() {
        setLoadData(true)
        const data = bsData.find((x) => {
            if (x.date === today) {
                return x
            }
        })
        if (data && loadData) {
            setLoadData(false)
            setFWI((data.fWE.toString()))
            setSWI((data.sWE.toString()))
            setRET((data.return.toString()))
            setOB(parseFloat(data.openingBalance.toString()))
            setCB(parseFloat(data.closingBalance.toString()))
            setWSA(parseFloat(data.weeklySave.toString()))
            setWSP(parseFloat(data.weeklySpent.toString()))   
        } else if (!data && !loadData){
            setLoadData(true)
            setFWI('0')
            setSWI('0')
            setRET('0')
        }
    }

    if (isClient) {
        return (
            <>
            <Navbars/>
                <div id="bs" className="d-flex mt-5 pt-3">
                    <form action={`api/bs/?username=${username}`} method="POST">
                        <div className="d-flex">
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
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>
                                            <input type="date" name="bsDate" id="bsDate" className="w-100" value={today} onChange={(event) => {
                                                setToday(formatDate(event.target.value))
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="fWI" id="fWI" className="w-100" value={fWI} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setFWI(input)
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="sWI" id="sWI" className="w-100" value={sWI} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setSWI(input)
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="ret" id="ret" className="w-100" value={ret} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setRET(input)
                                            }}></input>
                                        </td>
                                        <td>
                                            <input name="oB" id="oB" className="w-100" value={oB} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="cB" id="cB" className="w-100" value={cB} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="wSp" id="wSp" className="w-100" value={wSP} readOnly></input>
                                        </td>
                                        <td>
                                            <input name="wSa" id="wSa" className="w-100" value={wSA} readOnly></input>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </div>
                        <div className="d-flex">
                            <table className="table table-bordered w-75">
                                <thead>
                                    <tr>
                                        <th>Go</th>
                                        <th>Online</th>
                                        <th>Serious</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input id="go" className="w-100" value={goBal} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setGoBal(input)
                                                sumBS()
                                            }}></input>
                                        </td>
                                        <td>
                                            <input id="online" className="w-100" value={onBal} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setOnBal(input)
                                                sumBS()
                                            }}></input>
                                        </td>
                                        <td>
                                            <input id="serious" className="w-100" value={serBal} onChange={(event) => {
                                                let input = event.target.value
                                                if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                    input = '0'
                                                }
                                                setSerBal(input)
                                                sumBS()
                                            }}></input>
                                        </td>
                                        <td>
                                            <input id="total" className="w-100" value={total} readOnly></input>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <input className="table btn btn-primary w-25" type="submit" value="Submit"></input>
                        </div>
                    </form>
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
    const findBS = await BS.find({})
    const data = findBS.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
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