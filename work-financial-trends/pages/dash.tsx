'use client'
import Navbars from "@/pages/components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate, getStartDate, getWeekday } from "@/lib/funcPage";
import BS, { IBS } from "@/lib/utils/models/bsModel";
import MO, { IMO } from "@/lib/utils/models/moModel"
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { Table } from "react-bootstrap";

type Props = {
    userData: IUSER[],
    bsData: IBS[],
    moData: IMO[]
}

export default function HomeDash({ userData, bsData, moData }: Props ) {
    // clean up the codes
    const username = String(useSelector(lsUser))
    const [isClicked, setClicked] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [dateState, setDateState] = useState(0)
    const [cD, setCD] = useState(formatDate(Date()))
    const WD = getWeekday(cD)
    const [page, setPage] = useState('Mussel Entry')
    const [bP, setBP] = useState('btn-primary')
    const [bS, setBS] = useState('btn-secondary')
    // default for bs is true
    const [tF, setTF] = useState(true)

    useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        }
    })

    // Change page to either mussel or balance by auto
    function autoSet() {
        if ( WD === 'Saturday' || WD === 'Sunday') {
            setPage('Balance Sheet')
            setBP('btn-secondary')
            setBS('btn-primary')
            setTF(true)
            setDateState(1)
        } else {
            setBS('btn-secondary')
            setBP('btn-primary')
            setDateState(0)
            setTF(false)
        }
    }

    function changePage(str: String) {
        setClicked(true)
        if ( str === "Balance Entry") {
            setBP('btn-secondary')
            setBS('btn-primary')
            setDateState(1)
        } else {
            setBS('btn-secondary')
            setBP('btn-primary')
            setDateState(0)
            setTF(false)
        }
    }

    
    // For balance data entry
    const [goBal, setGoBal] = useState('0')
    const [onBal, setOnBal] = useState('0')
    const [serBal, setSerBal] = useState('0')
    const [total, setTotal] = useState('0')
    const [today, setToday] = useState(formatDate(Date()))
    const [fWI, setFWI] = useState('0')
    const [sWI, setSWI] = useState('0')
    const [ret, setRET] = useState('0')
    const [cB, setCB] = useState('0')
    const [wSP, setWSP] = useState('0')
    const [wSA, setWSA] = useState('0')
    const [oB, setOB] = useState('0')

    // For mussel data entry
    const [loadData, setLoadData] = useState(true)
    const [weekDay, setWeekDay] = useState('')
    const [spot, setSpot] = useState(0)
    const [fS, setFS] = useState(0)
    const [sS, setSS] = useState(0)
    const [tS, setTS] = useState(0)
    const [totalM, setTotalM] = useState(0)
    const [weekTotal, setWeekTotal] = useState(0)
    const [isHandleDate, setIsHandelDate] = useState(false)

    const dataMO = moData.filter((x) => {
        return x.username === username
    })

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
        if (!isClicked) {
            autoSet()
        }
    }, [today])

    useEffect(() => {
        setOB(String(closingBalance))
        sumBS()
    }, [goBal, onBal, serBal, fWI, sWI, ret, wSP, wSA, cB, oB])

    useEffect(() => {
        sumMO()
        setWeekTotal(Object.values(dataMO).reduce((t, {total}) => Number(t) + Number(total), 0))
    },  [spot, fS, sS, tS, total, weekTotal])

    // For balance data
    function weeklySpent() {
        let a = (parseFloat(String(fWI)) + parseFloat(String(sWI)) + parseFloat(String(ret)) + parseFloat(String(oB)) - parseFloat(String(cB))).toFixed(2)
        setWSP(String(parseFloat(a)))
    }

    function weeklySave() {
        let a = (parseFloat(String(cB)) - parseFloat(String(oB)) - parseFloat(String(ret))).toFixed(2)
        setWSA(String(parseFloat(a)))
    }

    function sumBS() {
        let x = (parseFloat(String(goBal)) + parseFloat(String(onBal)) + parseFloat(String(serBal))).toFixed(2)
        setTotal(String(parseFloat(x)))
        setCB(String(parseFloat(x)))
        weeklySpent()
        weeklySave()
    }

    // For mussel data
    if (loadData) {
        handleDate()
        setLoadData(false)
        sumMO()
    }

    function sumMO() {
        let x = Number(fS) + Number(sS) + Number(tS)
        setTotalM(x)
    }

    function handleDate() {
        const data = dataMO.find((x) => {
            if (x.date === today) {
                return x
            }
        })
        if (data) {
            setLoadData(true)
            if (loadData) {
                setLoadData(false)
                setSpot(Number(data.spot))
                setWeekDay(data.weekday)
                setFS(Number((data.fShift)))
                setSS(Number((data.sShift)))
                setTS(Number((data.tShift)))
            }
        } else {
            setSpot(0)
            setFS(0)
            setSS(0)
            setTS(0)
            sumMO()
        }
    }

    if (isClient) {
        return (
            <>
                <Navbars/>
                <div className="d-flex mt-5 pt-2 justify-content-between">
                    <div>
                        <input type="button" className={`btn ${bP}`} value={"Balance Entry"} disabled={tF} onClick={(event) => {
                            changePage(event.currentTarget.value)
                            setTF(!tF)
                        }}></input>
                    </div>
                    <div>
                        <input type="button" className={`btn ${bS}`} value={"Mussel Entry"} disabled={!tF} onClick={(event) => {
                            changePage(event.currentTarget.value)
                            setTF(!tF)
                        }}></input>
                    </div>
                </div>
                {/* Change the dashboard according to the button clicked */}
                {dateState ?
                    // balance data
                    <div id="bs" className="d-flex">
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
                                                    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                        setFWI(input)
                                                    }
                                                }}></input>
                                            </td>
                                            <td>
                                                <input name="sWI" id="sWI" className="w-100" value={sWI} onChange={(event) => {
                                                    let input = event.target.value
                                                    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                        setSWI(input)
                                                    }
                                                }}></input>
                                            </td>
                                            <td>
                                                <input name="ret" id="ret" className="w-100" value={ret} onChange={(event) => {
                                                    let input = event.target.value
                                                    if(input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                        setRET(input)
                                                    }
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
                                                    if (!input) {
                                                        event.target.select()
                                                    }
                                                    if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/) || !input) {
                                                        input = '0'
                                                    }
                                                    else {
                                                        setGoBal(input)
                                                    }
                                                }}></input>
                                            </td>
                                            <td>
                                                <input id="online" className="w-100" value={onBal} onChange={(event) => {
                                                    let input = event.target.value
                                                    if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                        input = '0'
                                                    } else {
                                                        setOnBal(input)
                                                    }
                                                }}></input>
                                            </td>
                                            <td>
                                                <input id="serious" className="w-100" value={serBal} onChange={(event) => {
                                                    let input = event.target.value
                                                    if(!input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
                                                        input = '0'
                                                    } else {
                                                        setSerBal(input)
                                                    }
                                                }}></input>
                                            </td>
                                            <td>
                                                <label id="total">{total}</label>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <input className="table btn btn-primary w-25" type="submit" value="Submit"></input>
                            </div>
                        </form>
                    </div>
                    :
                    // mussel data
                    <div id="mo" className="d-flex">
                    <form action={`api/mo/?username=${username}`} method="POST">
                        <table id="moOutput" className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Spot</th>
                                    <th>D1</th>
                                    <th>D2</th>
                                    <th>D3</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataMO.map((x) => (
                                    <tr key={formatDate(x.date)}>
                                        <td>{x.date}</td>
                                        <td>{x.spot.toString()}</td>
                                        <td>{x.fShift.toString()}</td>
                                        <td>{x.sShift.toString()}</td>
                                        <td>{x.tShift.toString()}</td>
                                        <td>{x.total.toString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <input type="date" name="moDate" id="moDate" className="w-100" value={today} onChange={(event) => {
                                            setToday(formatDate(event.target.value))
                                            setLoadData(true)
                                            setIsHandelDate(true)
                                            handleDate()
                                        }}/>
                                    </td>
                                    <td hidden={true}>
                                        <input type="text" name="weekday" value={getWeekday(today)} readOnly/>
                                    </td>
                                    <td>
                                        <input name="spot" id="spot" className="w-100" value={spot} onChange={(event) => {
                                            let input = event.target.value
                                            if (input.match(/^\d{1,2}$/)) {
                                                setSpot(Number(input))
                                            }
                                        }}/>
                                    </td>
                                    <td>
                                        <input name="fShift" id="fShift" className="w-100" value={fS} onChange={(event) => {
                                            let input = event.target.value
                                            if (input.match(/^\d{1,4}$/)) {
                                                setFS(Number(input))
                                            }
                                        }}/>
                                    </td>
                                    <td>
                                        <input name="sShift" id="sShift" className="w-100" value={sS} onChange={(event) => {
                                            let input = event.target.value
                                            if (input.match(/^\d{1,4}$/)) {
                                                setSS(Number(input))
                                            }
                                        }}/>
                                    </td>
                                    <td>
                                        <input name="tShift" id="tShift" className="w-100" value={tS} onChange={(event) => {
                                            let input = event.target.value
                                            if (input.match(/^\d{1,4}$/)) {
                                                setTS(Number(input))
                                            }
                                        }}/>
                                    </td>
                                    <td>
                                        <input name="total" id="total" className="w-100 border-0 p-0" value={total} readOnly/>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <input type="submit" value="Submit" className="btn btn-primary w-100"/>
                                    </td>
                                    <td colSpan={3} className="text-end">
                                        <label>Week Total</label>
                                    </td>
                                    <td>
                                        <label id="weekTotal">{weekTotal}</label>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </form>
                </div>
                }
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

    const cd = Date()
    let cWSD = getStartDate(cd)
    const findMO = await MO.find().where({date: {
        $gte: cWSD
    }})

    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const moData = findMO.map((doc) => {
      const moData = JSON.parse(JSON.stringify(doc))
      return moData
    })
  
    return { props: { bsData: bsData, moData: moData, userData: userData } }
}