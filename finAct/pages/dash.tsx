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
import Expenses, { EMO } from "@/lib/utils/models/expModel"
import { useSelector } from "react-redux";
import { lsUser } from "@/lib/redux";
import { Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    userData: IUSER[],
    bsData: IBS[],
    expData: EMO[]
}

export default function HomeDash({ userData, bsData, expData}: Props ) {
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

    // For expenses
    const [totalE, setTotalE] = useState('0');
    const [rent, setRent] = useState('0');
    const [groc, setGroc] = useState('0');
    const [onshp, setOnshp] = useState('0');
    const [shp, setShp] = useState('0');
    const [bro, setBro] = useState('0');
    const [ins, setIns] = useState('0');
    const [int, setInt] = useState('0');
    const [wta, setWta] = useState('0');
    const [mobp, setMobp] = useState('0');
    const [inst, setInst] = useState('0');
    const [mai, setMai] = useState('0');
    const [fuel, setFuel] = useState('0');
    const [elec, setElec] = useState('0');
    const [subs, setSubs] = useState('0');
    const [trav, setTrav] = useState('0');

    const [isHandleDate, setIsHandelDate] = useState(false);

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
        if (!isClicked) {
            autoSet()
        }
    }, [today, todays])

    useEffect(() => {
        setOB(String(closingBalance))
        sumBS()
    }, [amt, fWI, sWI, ret, wSP, wSA, cB, oB, total])

    useEffect(() => {
        setTotalE(sumExp(rent, groc, onshp, shp, bro, ins, int, wta, mobp, inst, mai, fuel, elec, subs, trav).toString())
    }, [rent + groc + onshp + shp + bro + ins + int + wta + mobp + inst + mai + fuel + elec + subs + trav, totalE])

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

    function sumExp(a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string, i: string, j: string, k: string, l: string ,m: string, n: string, o: string) {
        let x = parseFloat(a) + parseFloat(b) + parseFloat(c) + parseFloat(d) + parseFloat(e) + parseFloat(f) + parseFloat(g) + parseFloat(h) + parseFloat(i) + parseFloat(j) + parseFloat(k) + parseFloat(l) + parseFloat(m) + parseFloat(n) + parseFloat(o);
        return x;
    }

    function JSX(id: string, uN: string, data: EMO[]) {
        var total = 0;
        return (
            <Table striped bordered id="expOutput" responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Rent</th>
                        <th>Grocery</th>
                        <th>Online Shopping</th>
                        <th>Shopping</th>
                        <th>Broadband</th>
                        <th>Insurance</th>
                        <th>Interest</th>
                        <th>Withholding TAX</th>
                        <th>Mobile Plans</th>
                        <th>Installments</th>
                        <th>Car Maintenance</th>
                        <th>Fuel</th>
                        <th>Electricity</th>
                        <th>Subscriptions</th>
                        <th>Travel</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((x) => (
                        <tr key={formatDate(x.date)}>
                            <td>{x.date}</td>
                            <td>{x.rent.toString()}</td>
                            <td>{x.groc.toString()}</td>
                            <td>{x.on_shp.toString()}</td>
                            <td>{x.shp.toString()}</td>
                            <td>{x.bro.toString()}</td>
                            <td>{x.ins.toString()}</td>
                            <td>{x.int.toString()}</td>
                            <td>{x.wta.toString()}</td>
                            <td>{x.plans.toString()}</td>
                            <td>{x.inst.toString()}</td>
                            <td>{x.carme.toString()}</td>
                            <td>{x.fuel.toString()}</td>
                            <td>{x.elec.toString()}</td>
                            <td>{x.subs.toString()}</td>
                            <td>{x.tra.toString()}</td>
                            <td>{sumExp(x.rent.toString(), x.groc.toString(), x.on_shp.toString(), x.shp.toString(), x.bro.toString(), x.ins.toString(), x.int.toString(), x.wta.toString(), x.plans.toString(), x.inst.toString(), x.carme.toString(), x.fuel.toString(), x.elec.toString(), x.subs.toString(), x.tra.toString())}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td>
                            <input type="date" name={'date'} id="date" value={today} onChange={(event) => {
                                setToday(formatDate(event.target.value))
                                setIsHandelDate(true)
                            }}/>
                        </td>
                        <td>
                            <input name='rent' id="fShift" value={rent} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setRent(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='grocery' value={groc} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setGroc(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='online_shopp' value={onshp} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setOnshp(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='shopp' value={shp} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setShp(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='broadband' value={bro} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setBro(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='insurance' value={ins} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setIns(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='interest' value={int} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setInt(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='with_tax' value={wta} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setWta(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='mobile_plans' value={mobp} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setMobp(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='installments' value={inst} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setInst(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='car_main' value={mai} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setMai(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='fuel' value={fuel} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setFuel(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='electricity' value={elec} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setElec(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='subscriptions' value={subs} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setSubs(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='travel' value={trav} onChange={(event) => {
                                let input = event.target.value;
                                if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) setTrav(input.toString());
                            }}/>
                        </td>
                        <td>
                            <input name='total' readOnly value={totalE}/>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        )
    }

    //  For single opener
    function DailyExpenses() {
        return (
            <div>
            <form action={`api/expenses/?username=${username}`} method="POST">
                {JSX('single', username, expData)}
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
                        <input type="button" className={`btn ${bS}`} value={"Expenses Entry"} disabled={!tF} onClick={(event) => {
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
                   :
                    // Daily Expenses
                    DailyExpenses()
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
    const findExp = await Expenses.find().where({date: {
        $gte: cWSD
    }}).sort({date : 1})

    /* Ensures all objectIds and nested objectIds are serialized as JSON data */
    const expData = findExp.map((doc) => {
      const expData = JSON.parse(JSON.stringify(doc))
      return expData
    })
  
    return { props: { bsData: bsData, expData: expData, userData: userData } }
}