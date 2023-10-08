'use client'
import { Nav } from "@/pages/components/Nav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate } from "@/lib/funcPage";
import BS, { IBS } from "@/lib/utils/models/bsModel";

type Props = {
    userData: IUSER[],
    bsData: IBS[],
}

export default function HomeBS({ userData, bsData }: Props ) {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })
    const [goBal, setGoBal] = useState(0)
    const [onBal, setOnBal] = useState(0)
    const [serBal, setSerBal] = useState(0)
    const [total, setTotal] = useState(0)
    const [today, setToday] = useState(formatDate(Date()))
    const [fWI, setFWI] = useState(0)
    const [sWI, setSWI] = useState(0)
    const [ret, setRET] = useState(0)
    const [cB, setCB] = useState(0)
    const [wSP, setWSP] = useState(0)
    const [wSA, setWSA] = useState(0)
    const [oB, setOB] = useState(0)
    const [lod, setLod] = useState(false)
    const username = session?.user?.user
    const dataUser = userData.filter((x) => {
        return x.username === username
    })
    const dataBs = bsData.filter((x) => {
        return x.username === username
    })
    var filtData = dataBs.sort((a, b) => {
        return new Date(b.date) < new Date(a.date)
    }).reverse().slice(0, 5).reverse()
    const getCB = filtData.slice(4,5)
    const closingBalance = getCB.map((x) => {
        return x.closingBalance
    })

    useEffect(() => {
        setOB(parseFloat(closingBalance))
        sumBs()
        handleDate()
    }, [goBal, onBal, serBal, fWI, sWI, ret, wSP, wSA, today])

    function weeklySpent() {
        let a = (parseFloat(fWI) + parseFloat(sWI) + parseFloat(ret) + oB - parseFloat(cB)).toFixed(2)
        setWSP(a)
    }

    function weeklySave() {
        let a = (parseFloat(cB) - oB - parseFloat(ret)).toFixed(2)
        setWSA(a)
    }

    function sumBs() {
        let x = parseFloat(goBal) + parseFloat(onBal) + parseFloat(serBal)
        setCB(x.toFixed(2))
        setTotal(x)
        weeklySpent()
        weeklySave()
    }

    function handleDate() {
        const data = bsData.find((x) => {
            if (x.date === today) {
                return x
            }
        })
        if (data) {
            setFWI(data.fWE)
            setSWI(data.sWE)
            setRET(data.return)
            setOB(data.openingBalance)
            setCB(data.closingBalance)
            setWSA(data.weeklySave)
            setWSP(data.weeklySpent)
        }
    }

    return (
        <>
        <Nav/>
            <div id="bs" className="d-flex mt-5 pt-3">
                <form action={`api/bs/?username=${username}`} method="POST">
                    <div className="d-flex">
                        <table id="bsOutput" className="table table-bordered">
                            <thead aria-readonly="true">
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
                                            handleDate()
                                        }}></input>
                                    </td>
                                    <td>
                                        <input name="fWI" id="fWI" className="w-100" value={fWI} onChange={(event) => {
                                            let a = event.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setFWI(event.target.value)
                                            } else {
                                                alert('Must be float number')
                                            }
                                        }}></input>
                                    </td>
                                    <td>
                                        <input name="sWI" id="sWI" className="w-100" value={sWI} onChange={(event) => {
                                            let a = event.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setSWI(a)
                                                weeklySave
                                            } else {
                                                alert('Must be float number')
                                            }
                                        }}></input>
                                    </td>
                                    <td>
                                        <input name="ret" id="ret" className="w-100" value={ret} onChange={(e) => {
                                            let a = e.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setRET(a)
                                                weeklySave
                                            } else {
                                                alert('Must be float number')
                                            }
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
                        </table>
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
                                            let a = event.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setGoBal(event.target.value)
                                                sumBs()
                                            } else {
                                                alert('Must be float number')
                                            }
                                        }}></input>
                                    </td>
                                    <td>
                                        <input id="online" className="w-100" value={onBal} onChange={(event) => {
                                            let a = event.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setOnBal(event.target.value)
                                                sumBs()
                                            } else {
                                                alert('Must be float number')
                                            }
                                        }}></input>
                                    </td>
                                    <td>
                                        <input id="serious" className="w-100" value={serBal} onChange={(event) => {
                                            let a = event.target.value
                                            if (a.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                setSerBal(event.target.value)
                                                sumBs()
                                            } else {
                                                alert('Must be float number')
                                            }
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
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    await dbConnect()
    /* find all the data in our database */
    const findBS = await BS.find({})
  
    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const bsData = findBS.map((doc) => {
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