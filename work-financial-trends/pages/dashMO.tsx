'use client'
import { formatDate, getStartDate, getWeekNumber, getWeekday } from "@/lib/funcPage";
import { lsUser } from "@/lib/redux";
import dbConnect from "@/lib/utils/conn/mongoose";
import MO, { IMO } from "@/lib/utils/models/moModel";
import Navbars from "./components/navBar"
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
    moData: IMO[]
}

export default function HomeMO({moData }: Props ) {
    const [isClient, setIsClient] = useState(false)
    const [loadData, setLoadData] = useState(true)
    const username = String(useSelector(lsUser))
    const [today, setToday] = useState(formatDate(Date()))
    const [weekDay, setWeekDay] = useState('')
    const [spot, setSpot] = useState('0')
    const [fS, setFS] = useState('0')
    const [sS, setSS] = useState('0')
    const [tS, setTS] = useState('0')
    const [total, setTotal] = useState(0)
    const [weekTotal, setWeekTotal] = useState(0)
    const [cwn, setCWN] = useState(-1)
    const [pwn, setPWN] = useState(0)
    const dataMO = moData.filter((x) => {
        return x.username === username
    })
    // var filtData = dataMO.reverse().slice(0, 5).reverse()
    var filtData = dataMO
    // let twn = getWeekNumber(Date())
    // if (cwn === -1) {
    //     setCWN(getWeekNumber(filtData[filtData.length-1].date))
    // }
    // setPWN(getWeekNumber(filtData[filtData.length-1].date))
    // if (pwn === cwn) {

    // }

    useEffect(() => {
        setIsClient(true)
        sumMO()
        handleDate()
        setWeekTotal(Object.values(filtData).reduce((t, {total}) => t + parseInt(total.toString()), 0))
    }, [username, today, weekDay, spot, fS, sS, tS, total])

    function sumMO() {
        let x = parseInt(fS) + parseInt(sS) + parseInt(tS)
        setTotal(x)
    }

    function handleDate() {
        setLoadData(true)
        const data = dataMO.find((x) => {
            if (x.date === today) {
                return x
            }
        })
        if (data && loadData) {
            setLoadData(false)
            setSpot((data.spot.toString()))
            setWeekDay(data.weekday)
            setFS((data.fShift.toString()))
            setSS((data.sShift.toString()))
            setTS((data.tShift.toString()))
        } else if (!data && !loadData) {
            setLoadData(true)
            setSpot('0')
            setFS('0')
            setSS('0')
            setTS('0')
            sumMO()
        }
    }

    if (isClient) {
        return (
            <>
            <Navbars/>
            <div id="mo" className="d-flex mt-5 pt-3">
                <form action={`api/mo/?username=${username}`} method="POST">
                    <table id="moOutput" className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Spot</th>
                                <th>First Shift</th>
                                <th>Second Shift</th>
                                <th>Third Shift</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtData.map((x) => (
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
                                        handleDate()
                                    }}/>
                                </td>
                                <td hidden={true}>
                                    <input type="text" name="weekday" value={getWeekday(today)} readOnly/>
                                </td>
                                <td>
                                    <input name="spot" id="spot" className="w-100" value={spot} onChange={(event) => {
                                        let input = event.target.value
                                        if (!input.match(/[0-9]/)) {
                                            input = '0'
                                        }
                                        setSpot(input)
                                    }}/>
                                </td>
                                <td>
                                    <input name="fShift" id="fShift" className="w-100" value={fS} onChange={(event) => {
                                        let input = event.target.value
                                        if (!input.match(/[0-9]/)) {
                                            input = '0'
                                        }
                                        setFS(input)
                                    }}/>
                                </td>
                                <td>
                                    <input name="sShift" id="sShift" className="w-100" value={sS} onChange={(event) => {
                                        let input = event.target.value
                                        if (!input.match(/[0-9]/)) {
                                            input = '0'
                                        }
                                        setSS(input)
                                    }}/>
                                </td>
                                <td>
                                    <input name="tShift" id="tShift" className="w-100" value={tS} onChange={(event) => {
                                        let input = event.target.value
                                        if (!input.match(/[0-9]/)) {
                                            input = '0'
                                        }
                                        setTS(input)
                                    }}/>
                                </td>
                                <td>
                                    <input name="total" id="total" className="w-100" value={total} readOnly/>
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
                                    <input type="int" id="weekTotal" className="w-100" value={weekTotal} readOnly/>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
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
  
    return { props: { moData: moData } }
}