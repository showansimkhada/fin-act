import { Nav } from "@/features/components/Nav";
import { useEffect, useState } from "react";

export default function HomeBS() {
    const [goBal, setGoBal] = useState(0)
    const [onBal, setOnBal] = useState(0)
    const [serBal, setSerBal] = useState(0)
    const [total, setTotal] = useState(0)
    const [today, setToday] = useState(Date.now)

    const weeklySave = () => {

    }

    const sumBs = () => {
        let x = goBal + onBal + serBal
        setTotal(x)
    }

    const handleDate = () => {

    }

    return (
        <>
        <Nav/>
            <div id="bs" className="d-flex mt-5 pt-3">
                <form action="/bs/data" method="post">
                    <div className="d-flex">
                        <table id="bsOutput" className="table table-bordered">
                            <thead aria-readonly="true">
                                <tr>
                                    <th>Date</th>
                                    <th>First Name</th>
                                    <th>Second Name</th>
                                    <th>Return</th>
                                    <th>Opening Balance</th>
                                    <th>Closing Balance</th>
                                    <th>Weekly Spent</th>
                                    <th>Weekly Save</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <td>
                                        <input type="date" name="bsDate" id="bsDate" className="w-100" value={Date()} onChange={
                                            handleDate
                                        }></input>
                                    </td>
                                    <td>
                                        <input name="fWI" id="fWI" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="sWI" id="sWI" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="ret" id="ret" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="oB" id="oB" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="cB" id="cB" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="wSp" id="wSp" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                    <td>
                                        <input name="wSa" id="wSa" className="w-100" onChange={weeklySave}></input>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="d-flex">
                        <table className="table table-bordered w-75">
                            <thead>
                                <tr>
                                    <th aria-readonly="true">Go</th>
                                    <th aria-readonly="true">Online</th>
                                    <th aria-readonly="true">Serious</th>
                                    <th aria-readonly="true">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input id="go" className="w-100" value={goBal} onChange={(event) => {
                                            let a = event.target.value
                                            sumBs()
                                            setGoBal(parseFloat(a))
                                        }}></input>
                                    </td>
                                    <td>
                                        <input id="online" className="w-100" value={onBal} onChange={(event) => {
                                            sumBs()
                                            let a = event.target.value
                                            setOnBal(parseFloat(a))
                                        }}></input>
                                    </td>
                                    <td>
                                        <input id="serious" className="w-100" value={serBal} onChange={(event) => {
                                            sumBs()
                                            let a = event.target.value
                                            setSerBal(parseFloat(a))
                                        }}></input>
                                    </td>
                                    <td>
                                        <input id="total" className="w-100" value={total}></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
                {/* 
            div(class='d-flex')
                table(class='table table-bordered w-75')
                    thead
                        tr
                            th GO
                            th Online
                            th Serious Saver
                            th Total
                    tbody
                        tr
                            td
                                input(id='go' onchange='sumBs()' class='w-100')
                            td
                                input(id='online' onchange='sumBs()' class='w-100')
                            td
                                input(id='serious' onchange='sumBs()' class='w-100')
                            td
                                input(id='aTotal' class='w-100')
                input(type='submit' value='Submit' class='table btn btn-primary w-25') */}
        </>
    )
}