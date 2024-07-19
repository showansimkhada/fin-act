'use client'
import Navbars from "@/pages/components/navBar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import User, { IUSER } from '@/lib/utils/models/userModel'
import { GetServerSideProps } from "next";
import dbConnect from "@/lib/utils/conn/mongoose";
import { formatDate, getStartDate, getWeekday, stringAmt, sumAmt } from "@/lib/funcPage";
import BS, { IBS } from "@/lib/utils/models/bsModel";
import MO, { IMO } from "@/lib/utils/models/moModel"
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    const [moC, setMOC] = useState(0)
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
        function checkTwo() {
            let a = 0;
            dataUser.map((x) => {
                if (x.mo === true) {
                    if (x.mos === true) {
                        a = 1
                    } else {
                        a = 0
                    }
                }
            })
            return setMOC(a)
        }
        checkTwo()
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

    // change form according to button
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
    const [amt, setAmt] = useState('0')
    const [total, setTotal] = useState('0')
    const [today, setToday] = useState(formatDate(Date()))
    const [todays, setTodays] = useState(formatDate(Date()))
    const [fWI, setFWI] = useState('0')
    const [sWI, setSWI] = useState('0')
    const [ret, setRET] = useState('0')
    const [cB, setCB] = useState('0')
    const [wSP, setWSP] = useState('0')
    const [wSA, setWSA] = useState('0')
    const [oB, setOB] = useState('0')

    // For mussel data entry
    // For first opener
    const [loadData, setLoadData] = useState(true)
    const [weekDay, setWeekDay] = useState('')
    const [spot, setSpot] = useState(0)
    const [fS, setFS] = useState(0)
    const [sS, setSS] = useState(0)
    const [tS, setTS] = useState(0)
    const [totalM, setTotalM] = useState(0)
    const [weekTotal, setWeekTotal] = useState(0)

    // For second opener
    const [weekDays, setWeekDays] = useState('')
    const [spots, setSpots] = useState(0)
    const [fSs, setFSs] = useState(0)
    const [sSs, setSSs] = useState(0)
    const [tSs, setTSs] = useState(0)
    const [totalMs, setTotalMs] = useState(0)
    const [weekTotals, setWeekTotals] = useState(0)

    const [isHandleDate, setIsHandelDate] = useState(false)

    const dataMO = moData.filter((x) => {
        return x.username === username
    })

    const dataUser = userData.filter((x) => {
        return x.username === username
    })

    const fN = dataUser.map((x) => x.firstname)[0];
    const fNS = dataUser.map((x) => x.sfirstname)[0];
    const usernames = dataUser.map((x) => x.usernames)[0];

    const dataMOS = moData.filter((x) => {
        return x.username === usernames
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
    }, [today, todays])

    useEffect(() => {
        setOB(String(closingBalance))
        sumBS()
    }, [amt, fWI, sWI, ret, wSP, wSA, cB, oB])

    useEffect(() => {
        sumMO()
        setWeekTotal(Object.values(dataMO).reduce((t, {total}) => Number(t) + Number(total), 0))
        setWeekTotals(Object.values(dataMOS).reduce((t, {total}) => Number(t) + Number(total), 0))
    },  [spot, fS, sS, tS, totalM, spots, fSs, sSs, tSs, totalMs])

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

    // MO
    if (loadData) {
        handleDate()
        setLoadData(false)
        sumMO()
    }

    // MO
    function sumMO() {
        if (moC) {
            let x = Number(fS) + Number(sS) + Number(tS)
            let y = Number(fSs) + Number(sSs) + Number(tSs)
            setTotalM(x)
            setTotalMs(y)
        } else {
            let x = Number(fS) + Number(sS) + Number(tS)
            setTotalM(x)
        }
    }

    function handleDate() {
        // MO
        const data = dataMO.find((x) => {
            if (x.date === today) {
                return x
            }
        })
        const datas = dataMOS.find((x) => {
            if (x.date === todays) {
                return x
            }
        })
        // MO
        if (data) {
            setLoadData(true)
            if (loadData) {
                setLoadData(false)
                setSpot(Number(data.spot))
                setWeekDay(data.weekday)
                setFS(Number(data.fShift))
                setSS(Number(data.sShift))
                setTS(Number(data.tShift))
            }
        } else {
            setSpot(0)
            setFS(0)
            setSS(0)
            setTS(0)
            sumMO()
        }
        // MO
        if (datas) {
            setLoadData(true)
            if (loadData) {
                setLoadData(false)
                setSpots(Number(datas.spot))
                setWeekDays(datas.weekday)
                setFSs(Number(datas.fShift))
                setSSs(Number(datas.sShift))
                setTSs(Number(datas.tShift))
            }
        } else {
            setSpots(0)
            setFSs(0)
            setSSs(0)
            setTSs(0)
            sumMO()
        }
    }

    function JSX(id: string, uN: string, data: IMO[]) {
        var check = false;
        if (id !== 'single') {
            if (id === 'second') {
                check = true
            }
        } else {
            id = ''
        }
        return (
            <>
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
                    {data.map((x) => (
                        <tr key={formatDate(x.date)}>
                            <td>{x.date}</td>
                            <td>{x.spot.toString()}</td>
                            <td>{x.fShift.toString()}</td>
                            <td>{x.sShift.toString()}</td>
                            <td>{x.tShift.toString()}</td>
                            <td className="d-flex flex-row justify-content-between">{x.total.toString()}
                                <Form action={`api/mo/?type=deleteD&id=${x._id}`} method='post'>
                                    <button className='border-0 bg-transparent'><FontAwesomeIcon type='submit' icon='trash' color='red'/></button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input type="date" name={`${id}moDate`} id="moDate" className="w-100" value={check ? todays: today} onChange={(event) => {
                                check ? setTodays(formatDate(event.target.value)) : setToday(formatDate(event.target.value))
                                setLoadData(true)
                                setIsHandelDate(true)
                                handleDate()
                            }}/>
                        </td>
                        <td hidden={true}>
                            <input type="text" name={`${id}weekday`} value={check ? getWeekday(todays) : getWeekday(today)} readOnly/>
                        </td>
                        <td>
                            <input name={`${id}spot`} id="spot" className="w-100" onChange={(event) => {
                                let input = parseInt(event.target.value)
                                if (!input) {
                                    check ? setSpots(0) : setSpot(0)
                                } else if(input > 31) {
                                    
                                } else {
                                    check ? setSpots(input) : setSpot(input)
                                }
                            }} value={check ? spots : spot}/>
                        </td>
                        <td>
                            <input name={`${id}fShift`} id="fShift" className="w-100" value={check ? fSs : fS} onChange={(event) => {
                                let input = parseInt(event.target.value)
                                if (!input) {
                                    check ? setFSs(0) : setFS(0)
                                } else if(String(input).length > 4) {
                                    
                                } else {
                                    check ? setFSs(input) : setFS(input)
                                }
                            }}/>
                        </td>
                        <td>
                            <input name={`${id}sShift`} id="sShift" className="w-100" value={check ? sSs: sS} onChange={(event) => {
                                let input = parseInt(event.target.value)
                                if (!input) {
                                    check ? setSSs(0) : setSS(0)
                                } else if(String(input).length > 4) {
                                    
                                } else {
                                    check ? setSSs(input) : setSS(input)
                                }
                            }}/>
                        </td>
                        <td>
                            <input name={`${id}tShift`} id="tShift" className="w-100" value={check ? tSs : tS} onChange={(event) => {
                                let input = parseInt(event.target.value)
                                if (!input) {
                                    check ? setTSs(0) : setTS(0)
                                } else if(String(input).length > 4) {
                                    
                                } else {
                                    check ? setTSs(input) : setTS(input)
                                }
                            }}/>
                        </td>
                        <td>
                            <input name={`${id}totalM`} id="totalM" className="w-100 border-0 p-0" value={check ? totalMs : totalM} readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} rowSpan={2}>
                            <label>Weekly Total</label>
                        </td>
                        <td colSpan={3} className="text-end">
                            <label>Opened Mussel</label>
                        </td>
                        <td>
                            <label id="weekTotal">{check ? weekTotals : weekTotal}</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} className="text-end">
                            <label>Expected Income</label>
                        </td>
                        <td>
                            <label>{check ? (weekTotals*0.02).toFixed(2) : (weekTotal*0.02).toFixed(2)}</label>
                        </td>
                    </tr>
                </tfoot>
            </table>
            </>
        )
    }

    //  For single opener
    function MoEnOne() {
        return (
            <div>
            <form action={`api/mo/?username=${username}`} method="POST">
                {JSX('single', username, dataMO)}
                <input id="submit" type="submit" value="Submit" className="btn btn-primary w-100"/>
            </form>
            </div>
        )
    }

    // For both opener
    function MoEnTwo() {
        const array = [username, usernames]
        return (
            <div>
            <form action={`api/mo/?username=${array}`} method="POST">
                <h3 className="align-self-center">{fN}</h3>
                {JSX('first', username, dataMO)}
                <h3 className="pl-5">{fNS}</h3>
                {JSX('second', usernames, dataMOS)}
                <input id="submit" type="submit" value="Submit" className="btn btn-primary w-100"/>
            </form>
            </div>
        )
    }

    if (isClient) {
        return (
            <div className="w-100">
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
                { dateState ?
                    // Balance Sheet 
                    <div id="bs">
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
                            <div className="d-flex pl-5 pr-5">
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
                   :
                   // mussel data
                   moC ? MoEnTwo() : MoEnOne()
                }
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

    const cd = new Date();
    let cWSD = getStartDate(cd.toUTCString())
    const findMO = await MO.find().where({date: {
        $gte: cWSD
    }}).sort({date : 1})

    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const moData = findMO.map((doc) => {
      const moData = JSON.parse(JSON.stringify(doc))
      return moData
    })
  
    return { props: { bsData: bsData, moData: moData, userData: userData } }
}